import { integer } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { customers } from './customers.ts'

export const orderStatus = pgEnum('order_status', [
    'pending',
    'paid',
    'canceled'

])

export const orders = pgTable('orders', {
    id: text().primaryKey(),
    customerId: text().notNull().references(() => customers.id),
    amount: integer().notNull(),
    status: orderStatus().notNull().default('pending'),
    createdAt: timestamp().defaultNow().notNull()
})