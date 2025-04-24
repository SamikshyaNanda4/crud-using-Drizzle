import { integer,boolean,text,pgTable,serial,varchar,timestamp } from "drizzle-orm/pg-core";

export const tasks=pgTable(
    "tasks",{
        id: integer("id").primaryKey(),
        text:text("text").notNull(),
        done:boolean("done").default(false).notNull(),
    }
)


export const questions=pgTable(
    "questions",{
        id:serial("id").primaryKey(),
        title: varchar('title', { length: 255 }).notNull(),
        description: text('description').notNull(),
        difficulty: varchar('difficulty', { length: 20 }).notNull(),
        tags: text('tags').array(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
)