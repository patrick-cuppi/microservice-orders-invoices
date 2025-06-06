import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { channels } from '../broker/channels/index.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

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

    channels.orders.sendToQueue('orders', Buffer.from('Testing order'))

    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    console.log('[Orders] HTTP Server is running on http://localhost:3333')
})