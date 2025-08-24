import { stripe } from '@/stripe'

export async function POST(req: Request) {
    const { customerId } = await req.json()

    if (!customerId) {
        return new Response(JSON.stringify({ error: 'Customer ID is required.' }), { status: 400 })
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${req.headers.get('origin')}/settings`,
        })

        return new Response(JSON.stringify({ url: portalSession.url }), { status: 200 })
    } catch (error) {
        console.error(`Error creating billing portal session: ${error}`)
        return new Response(JSON.stringify({ error: 'Failed to create billing portal session.' }), { status: 500 })
    }
}
