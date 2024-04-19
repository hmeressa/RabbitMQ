const AMQPLib = require('amqplib');
const rabbitAMQPUrl = 'amqp://localhost:5672';
const exchangeName = "crud_exchange";

const rabbitAMQPConnection = {
    createConnection: async () => {
        return await AMQPLib.connect(rabbitAMQPUrl);
    },
    producerConnection: async (routingKey, data) => {
        const connection = await this.rabbitAMQPConnection.createConnection();
        const channel = await connection.createChannel();
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)));
    },
    consumerConnection: async (bindingPattern, callback) => {
        const connection = await createConnection();
        const channel = await connection.createChannel();
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        const queue = await channel.assertQueue('', { exclusive: true });
        channel.bindQueue(queue.queue, exchangeName, bindingPattern);
        channel.consume(queue.queue, async (message) => {
            const content = JSON.parse(message.content.toString());
            await callback(content);

            channel.ack(message);
        });

        // return queue.queue;
    },
}

module.exports = rabbitAMQPConnection;
