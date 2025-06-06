import fastifyCors from '@fastify/cors'
import { trace } from '@opentelemetry/api'
import '@opentelemetry/auto-instrumentations-node/register'
import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { setTimeout } from 'node:timers/promises'
import { tracer } from '../tracer/tracer.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: '*' })

app.get('/health', () => {
    return 'OK'
})

app.post('/orders', {
    schema: {
        body: z.object({
            amount: z.coerce.number()
        })
    }
}, async (request, reply) => {
    const { amount } = request.body

    console.log('New order received:', amount)

    const orderId = randomUUID()

    await db.insert(schema.orders).values({
        id: randomUUID(),
        customerId: '39c2dbbe-ea6b-414a-9b48-52060051e92c',
        amount,
    })

    const span = tracer.startSpan('test-span')
    await setTimeout(2000)
    span.end()

    trace.getActiveSpan()?.setAttribute('order_id', orderId)

    dispatchOrderCreated({
        orderId,
        amount,
        customer: {
            id: '39c2dbbe-ea6b-414a-9b48-52060051e92c'
        }
    })

    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    console.log('[Orders] HTTP Server is running on http://localhost:3333')
})