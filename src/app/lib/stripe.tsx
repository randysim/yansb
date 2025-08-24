import type { ProductType } from '../components/pricing'
import { loadStripe } from '@stripe/stripe-js'

export const products: ProductType[] = [
    {
        id: 'price_1RzNnSDPxBQWa6K6hLqfjjcY',
        title: 'Basic',
        description: 'For People Getting Started',
        price: '$10',
        interval: 'month',
        features: ['Up to 5 projects', 'Basic analytics', 'Email support'],
    },
    {
        id: 'price_1RzNnyDPxBQWa6K6l8AnwP0I',
        title: 'Pro',
        description: 'For Passionate Enthusiasts',
        price: '$20',
        interval: 'month',
        features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    },
    {
        id: 'price_1RzNoTDPxBQWa6K6Dg0LYgy4',
        title: 'Enterprise',
        description: 'Per Seat',
        price: '$30',
        interval: 'month',
        features: [
            'Everything in Pro',
            'Team collaboration',
            'Advanced security',
            'Custom branding',
            'Dedicated support',
        ],
    },
]

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '')
