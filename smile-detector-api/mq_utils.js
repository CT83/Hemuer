var amqp = require('amqplib');

var amqUrl = "amqp://xcweyitd:WZroDK9OzZ2Kih9qgOVbZ_hydHKwPFGq@salamander.rmq.cloudamqp.com/xcweyitd";
var connection = null

async function start() {
    connection = await amqp.connect(amqUrl)
    console.log("AMQP Connection Opened!")
}

async function publishToQueue(message) {
    try {
        console.log(connection)
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
exports.start = start;