import Navbar from "./components/navbar";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "@/db";
import { settings } from "@/db/schema";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/signin");
    }

    const settingsRows = await db.select()
      .from(settings)
      .where(eq(settings.userId, session.user.id));

    if (settingsRows.length === 0) {
      redirect("/onboard")
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}