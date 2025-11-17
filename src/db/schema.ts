import { pgTable, timestamp, uuid, varchar, text, integer, serial, boolean, unique } from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'
import { v4 as uuidv4 } from 'uuid'
import Stripe from 'stripe'

export const users = pgTable('users', {
    id: uuid()
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    emailVerified: timestamp({ mode: 'date' }),
    image: varchar({ length: 255 }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
})

export const accounts = pgTable(
    'accounts',
    {
        id: serial("id").primaryKey(), // Purely for database convenience using Supabase WebUI
        userId: uuid()
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text().$type<AdapterAccountType>().notNull(),
        provider: text().notNull(),
        providerAccountId: text().notNull(),
        refresh_token: text(),
        access_token: text(),
        expires_at: integer(),
        token_type: text(),
        scope: text(),
        id_token: text(),
        session_state: text(),
        created_at: timestamp().notNull().defaultNow(),
        updated_at: timestamp()
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (account) => [
        unique("provider_providerAccountId_idx").on(account.provider, account.providerAccountId)
    ]
)

export const sessions = pgTable('sessions', {
    sessionToken: text().primaryKey(),
    userId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp({ mode: 'date' }).notNull(),
})

export const settings = pgTable('settings', {
    userId: uuid()
        .primaryKey()
        .references(() => users.id, { onDelete: 'cascade' }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    customerId: varchar({ length: 255 }).unique(),

    /* EXAMPLE PROPERTIES */
    nextjsFirstTime: boolean().notNull(),
    dob: timestamp().notNull(),
    yoe: integer().notNull(),
})

export const subscriptions = pgTable('subscriptions', {
    id: varchar({ length: 255 }).primaryKey(),
    customerId: varchar({ length: 255 }).references(() => settings.customerId, { onDelete: 'cascade' }),
    status: text().$type<Stripe.Subscription.Status>().notNull(),
    priceId: text(),
    currentPeriodStart: integer(),
    currentPeriodEnd: integer(),
    cancelAtPeriodEnd: boolean(),
    paymentBrand: text(),
    paymentLast4: text(),
})
