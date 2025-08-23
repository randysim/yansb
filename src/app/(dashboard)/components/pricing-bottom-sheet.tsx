import { PricingSection, ProductType } from "@/app/components/pricing";
import { products, stripePromise } from "@/app/lib/stripe";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";
import React from "react";

export default function PricingBottomSheet({ children } : React.PropsWithChildren<{}>) {
    const handleCheckout = async (product: ProductType) => {
        try {
            const response = await fetch("/api/subscriptions/checkout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ priceId: product.id })
            });

            if (response.status !== 200) {
                throw new Error("Failed to create checkout session");
            }

            const { sessionId } = await response.json();
            
            const stripe = await stripePromise
            const { error } = await stripe!.redirectToCheckout({
                sessionId
            });

            if (error) {
                throw new Error("Failed to redirect to checkout");
            }
        } catch (error) {
            console.error('Error creating checkout session:', error)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    {children}
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-w-full max-h-[90vh] sm:max-h-[600px] overflow-y-auto flex items-center">
                <SheetHeader className="text-center">
                    <SheetTitle>Pricing Plans</SheetTitle>
                    <SheetDescription>
                        Choose the plan that suits you best.
                    </SheetDescription>
                </SheetHeader>
                <PricingSection
                products={products}
                onProductSelect={handleCheckout}
                />
                <div className="flex justify-center py-4">
                    <SheetClose asChild>
                        <Button className="w-[200px]">
                            Close
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}