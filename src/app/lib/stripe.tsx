import type { ProductType } from "../components/pricing";

export const products: ProductType[] = [
    {
        id: "real-id-1",
        title: "Basic",
        description: "For People Getting Started",
        price: "$10",
        interval: "month",
        features: [
            "Up to 5 projects",
            "Basic analytics",
            "Email support"
        ]
    },
    {
        id: "real-id-2",
        title: "Pro",
        description: "For Passionate Enthusiasts",
        price: "$20",
        interval: "month",
        features: [
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "Custom integrations"
        ]
    },
    {
        id: "real-id-3",
        title: "Enterprise",
        description: "Per Seat",
        price: "$30",
        interval: "month",
        features: [
            "Everything in Pro",
            "Team collaboration",
            "Advanced security",
            "Custom branding",
            "Dedicated support"
        ]
    }
]