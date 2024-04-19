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
    } catch (error) {
        throw error;
    }
}

app.post('/send', async (req, res, next) => {
    const data = {
        name: "Hiluf",
        age: 26,
        sex: "Male",
        name: "Hiluf",
        age: 26,
        sexs: "Males"
    };
    await channel.sendToQueue('Test', Buffer.from(JSON.stringify(data)));
    res.send("done")
})

app.listen(5000, () => {
    console.log("Server is starting on port 5000");
})
