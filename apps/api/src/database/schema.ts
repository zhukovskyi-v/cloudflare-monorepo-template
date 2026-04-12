import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core'
import {sql} from "drizzle-orm";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
})
