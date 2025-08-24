import NextAuth from "next-auth";
import { InferSelectModel } from "drizzle-orm";
import { settings, subscriptions } from "@/db/schema";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            image: string
            role: string
            subscription: InferSelectModel<typeof subscriptions> | null
            setting: InferSelectModel<typeof settings> | null
        }
    }
}