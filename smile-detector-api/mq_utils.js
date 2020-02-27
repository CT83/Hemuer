var amqp = require('amqplib');

async function publishToQueue(message) {
    try {
        var amqUrl = "amqp://xcweyitd:WZroDK9OzZ2Kih9qgOVbZ_hydHKwPFGq@salamander.rmq.cloudamqp.com/xcweyitd";
        const connection = await amqp.connect(amqUrl)
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)))
        console.log(`Job sent successfully ${JSON.stringify(message)}`);
    }
    catch (ex) {
        console.error(ex)
    }
}

exports.publishToQueue = publishToQueue;