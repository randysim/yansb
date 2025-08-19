import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().$defaultFn(() => uuidv4()),
    email: varchar({ length: 255 }).notNull().unique()
})