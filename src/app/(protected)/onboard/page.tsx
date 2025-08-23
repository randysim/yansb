import { redirect } from "next/navigation";
import OnboardManager from "./components/onboard-manager";
import { auth } from "@/auth";
import { settings } from "@/db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";

export default async function OnboardPage() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        redirect("/signin");
    }

    const settingsRows = await db.select()
        .from(settings)
        .where(eq(settings.userId, session.user.id));

    if (settingsRows.length > 0) {
        redirect("/dashboard")
    }

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <OnboardManager />
        </div>
    )
}