import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { processEvent, stripe } from "@/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature");

    if (!signature) return NextResponse.json({}, { status: 400 });

    async function doEventProcessing() {
        if (typeof signature !== "string") {
        throw new Error("[STRIPE HOOK] Header isn't a string???");
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        await processEvent(event);
    }

    try {
        await doEventProcessing();
    } catch (error) {
        console.error("[STRIPE HOOK] Error processing event", error);
    }

    return NextResponse.json({ received: true });
}