import PricingBottomSheet from "../../components/pricing-bottom-sheet"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { products } from "@/app/lib/stripe"

export default function BillingSection({ session }: { session: Session }) {
    const renderSubscriptionData = () => {
        if (!session.user.subscription) {
            return (
                <p className="text-muted-foreground">Free Plan</p>
            )
        }

        let startDate = "Unknown";
        let endDate = "Unknown";

        if (session.user.subscription.currentPeriodStart) {
            startDate = new Date(session.user.subscription.currentPeriodStart * 1000).toLocaleDateString();
        }

        if (session.user.subscription.currentPeriodEnd) {
            endDate = new Date(session.user.subscription.currentPeriodEnd * 1000).toLocaleDateString();
        }

        return (
            <div>
                <p className="text-muted-foreground">
                    {
                        products.find(p => p.id === session.user.subscription?.priceId)?.title
                    }
                </p>
                <p>
                    From {startDate} to {endDate}
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Billing Settings</h2>
                <div className="bg-card rounded-lg border p-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">Current Plan</h3>
                            {renderSubscriptionData()}
                        </div>
                        <div className="flex space-x-2">
                            {
                                session.user.subscription ? (
                                    <Button>
                                        Manage Plan
                                    </Button>
                                ) : (
                                    <PricingBottomSheet>Upgrade Plan</PricingBottomSheet>
                                )
                            }
                            <Button variant="outline">View Usage</Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}