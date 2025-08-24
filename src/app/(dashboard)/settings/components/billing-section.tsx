import PricingBottomSheet from "../../components/pricing-bottom-sheet"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"

export default function BillingSection({ session }: { session: Session | null }) {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Billing Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Current Plan</h3>
            <p className="text-muted-foreground">Free Plan</p>
          </div>
          <div className="flex space-x-2">
            <PricingBottomSheet>Upgrade Plan</PricingBottomSheet>
            <Button variant="outline">View Usage</Button>
          </div>
        </div>
      </div>
    </div>
  )
}