import { redirect } from "next/navigation";
import { auth } from "@/auth";
import db from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";


export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const settingsRows = await db.select()
    .from(settings)
    .where(eq(settings.userId, session.user.id));

  if (settingsRows.length === 0) {
    redirect("/onboard")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
