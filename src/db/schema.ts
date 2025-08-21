import { pgTable, timestamp, uuid, varchar, text, integer, primaryKey, boolean } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
    id: uuid().primaryKey().$defaultFn(() => uuidv4()),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    emailVerified: timestamp({ mode: "date" }),
    image: varchar({ length: 255 }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow().$onUpdate(() => new Date())
})

export const accounts = pgTable(
    "accounts", 
    {
        userId: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
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
        updated_at: timestamp().notNull().defaultNow().$onUpdate(() => new Date())
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId]
            })
        }
    ]
)

export const sessions = pgTable("sessions", {
    sessionToken: text().primaryKey(),
    userId: uuid().notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp({ mode: "date" }).notNull()
})

export const settings = pgTable("settings", {
    userId: uuid().primaryKey().references(() => users.id, { onDelete: "cascade" }),
    nextjsFirstTime: boolean().notNull(),
    dob: timestamp().notNull(),
    yoe: integer().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow().$onUpdate(() => new Date())
})