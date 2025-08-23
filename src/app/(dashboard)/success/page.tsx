import { auth } from "@/auth";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import db from "@/db";
import { settings } from "@/db/schema";
import { syncStripeData } from "@/stripe";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

export default function SuccessPage() {
    return (
        <div className="w-full py-24">
            <Suspense fallback={<Spinner variant="circle" size={64} />}>
                <VerifySuccess />
            </Suspense>
        </div>
    );
}

async function VerifySuccess() {
    const session = await auth();

    if (!session?.user?.id) return null;

    const settingsRows = await db
        .select()
        .from(settings)
        .where(eq(settings.userId, session.user.id));

    if (settingsRows.length === 0) return null;

    const userSettings = settingsRows[0];

    if (!userSettings.customerId) return null;

    const subscription = await syncStripeData(userSettings.customerId);

    if (!subscription) {
        return (
            <div>
                <h1 className="text-4xl font-semibold text-center">Error</h1>
                <p className="mt-4 text-lg text-center">Your payment was not successful.</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="text-4xl font-semibold text-center">Success</h1>
                <p className="mt-4 text-lg text-center">Your payment was successful.</p>
            </div>
        )
    }
}
