import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { channels } from '../broker/channels/index.ts'
import fastifyCors from '@fastify/cors'
import { schema } from '../db/schema/index.ts'
import { db } from '../db/client.ts'
import { randomUUID } from 'node:crypto'

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

    channels.orders.sendToQueue('orders', Buffer.from(JSON.stringify({ amount })))

    try {
        await db.insert(schema.orders).values({
            id: randomUUID(),
            customerId: '39c2dbbe-ea6b-414a-9b48-52060051e92c',
            amount,
        })
    } catch (error) {
        console.log(error)
    }

    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    console.log('[Orders] HTTP Server is running on http://localhost:3333')
})