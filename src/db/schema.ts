import { integer,boolean,text,pgTable } from "drizzle-orm/pg-core";

export const tasks=pgTable(
    "tasks",{
        id: integer("id").primaryKey(),
        text:text("text").notNull(),
        done:boolean("done").default(false).notNull(),
    }
)