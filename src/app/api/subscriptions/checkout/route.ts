import { auth } from "@/auth";
import db from "@/db";
import { settings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/stripe";

export async function POST(req: Request) {
    const { priceId } = await req.json();

    if (!priceId) {
        return new Response(JSON.stringify({ error: "Price ID is required" }), { status: 400 });
    }

    const session = await auth();
    
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const settingsRows = await db
        .select()
        .from(settings)
        .innerJoin(users, eq(settings.userId, users.id))
        .where(eq(settings.userId, session.user.id))
        .limit(1);

    if (settingsRows.length === 0) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 400 });
    }

    const { users: user, settings: userSettings } = settingsRows[0];

    if (!userSettings.customerId) {
        const newCustomer = await stripe.customers.create({
            email: user.email,
            metadata: {
                userId: user.id
            }
        });

        userSettings.customerId = newCustomer.id;

        await db
            .update(settings)
            .set({ customerId: newCustomer.id })
            .where(eq(settings.userId, user.id));
    }

    const headersList = req.headers;
    const origin = headersList.get('origin');

    const checkout = await stripe.checkout.sessions.create({
        customer: userSettings.customerId,
        success_url: `${origin}/success`,
        mode: "subscription",
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ]
    });

    return new Response(JSON.stringify({ sessionId: checkout.id }), { status: 200 });
}