"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export type ProductType = {
    id: string;
    title: string;
    description: string;
    price: string;
    interval: string;
    features: string[];
}

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    interval: string;
    features: string[];
    onSelect: () => void;
}

interface PricingSectionProps {
    products: ProductType[];
    onProductSelect?: (product: ProductType) => void;
    href?: string;
}

export function PricingCard(
    { 
        title,
        description, 
        price,
        interval, 
        features,
        onSelect
    }: PricingCardProps
) {
    return (
        <Card className="bg-white shadow-md rounded-lg w-80 px-4 py-8">
            <CardHeader>
                <CardTitle className="text-3xl text-center">{title}</CardTitle>
                <CardDescription className="text-center">{description}</CardDescription>
                <div className="flex items-center justify-center p-2">
                    <span className="text-4xl font-bold text-center">{price}</span>
                    <span className="text-gray-500 text-center ml-2">/ {interval}</span>
                </div>
                <Button
                    className="w-full" 
                    onClick={onSelect}
                >
                    Select
                </Button>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {
                        features.map((feature, idx) => (
                            <li key={idx} className="text-gray-700 flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                {feature}
                            </li>
                        ))
                    }
                </ul>
            </CardContent>
        </Card>
    );
}

export function PricingSection(
    {
        products,
        onProductSelect,
        href
    }: PricingSectionProps
) {
    const router = useRouter()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <PricingCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    interval={product.interval}
                    features={product.features}
                    onSelect={() => {
                        if (onProductSelect && href) {
                            throw new Error("Too many pricing section actions specified. Either provide a callback or an href.")
                        }

                        if (onProductSelect) {
                            onProductSelect(product);
                        } else if (href) {
                            router.push(href);
                        } else {
                            throw new Error("Pricing Section action not specified. Either provide a callback or an href.")
                        }
                    }}
                />
            ))}
        </div>
    );
}