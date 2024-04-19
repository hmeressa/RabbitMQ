const express = require('express');
const app = express();
const amqp = require('amqplib');
connect();
var connection, channel;
async function connect() {
    try {
        const RabbitMQUrl = "amqp://localhost:5672";
        connection = await amqp.connect(RabbitMQUrl);
        channel = await connection.createChannel();
        await channel.assertQueue("Test", { durable: true, autoDelete: false });
        await channel.consume("Test", data => {
            console.log(data.content.toString())
            channel.ack(data);
        })
    } catch (error) {
        throw error;
    }
}

app.get('/send', async (req, res, next) => {
    const data = {
        name: "Hiluf",
        age: 26
    };
    await channel.sendToQueue('Test', Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close();
    res.send("done")
})

app.listen(6000, () => {
    console.log("server is starting on port 6000");
})
