import { redirect } from "next/navigation";
import { auth } from "@/auth";
import db from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  return (
    <div className="flex justify-center items-center py-24">
      <Card className="mx-4">
        <CardHeader className="text-center">
          <h1 className="text-4xl font-semi-bold">Dashboard</h1>
          <p className="mt-4 text-lg">Welcome back {session.user.name}!</p>
        </CardHeader>
        <CardContent>
          <p>This is where your dashboard goes! Add the main page for your dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
