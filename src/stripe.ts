/* IMPLEMENTATION TAKEN FROM https://github.com/t3dotgg/stripe-recommendations */

import Stripe from 'stripe'
import { subscriptions } from './db/schema'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import db from '@/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const allowedEvents: Stripe.Event.Type[] = [
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'customer.subscription.paused',
    'customer.subscription.resumed',
    'customer.subscription.pending_update_applied',
    'customer.subscription.pending_update_expired',
    'customer.subscription.trial_will_end',
    'invoice.paid',
    'invoice.payment_failed',
    'invoice.payment_action_required',
    'invoice.upcoming',
    'invoice.marked_uncollectible',
    'invoice.payment_succeeded',
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'payment_intent.canceled',
]

export async function syncStripeData(customerId: string) {
    const userSubscriptions = await stripe.subscriptions.list({
        customer: customerId,
        limit: 1,
        status: 'all',
        expand: ['data.default_payment_method'],
    })

    if (userSubscriptions.data.length === 0) {
        /* DELETE SUBSCRIPTION IN DATABASE */
        await db.delete(subscriptions).where(eq(subscriptions.customerId, customerId))

        return null
    }

    const subscription = userSubscriptions.data[0]

    const subscriptionData = {
        customerId: customerId,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        currentPeriodStart: subscription.items.data[0].current_period_start,
        currentPeriodEnd: subscription.items.data[0].current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        paymentBrand:
            subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
                ? subscription.default_payment_method.card?.brand
                : null,
        paymentLast4:
            subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
                ? subscription.default_payment_method.card?.last4
                : null,
    }

    await db
        .insert(subscriptions)
        .values({ id: subscription.id, ...subscriptionData })
        .onConflictDoUpdate({
            target: subscriptions.id,
            set: subscriptionData,
        })

    return { id: subscription.id, ...subscriptionData }
}

export async function processEvent(event: Stripe.Event) {
    if (!allowedEvents.includes(event.type)) return

    /* ALL TRACKED EVENTS HAVE CUSTOMER ID */
    const { customer: customerId } = event?.data?.object as {
        customer: string
    }

    if (typeof customerId !== 'string') {
        throw new Error(`[STRIPE HOOK][CANCER] ID isn't string.\nEvent type: ${event.type}`)
    }

    return await syncStripeData(customerId)
}
