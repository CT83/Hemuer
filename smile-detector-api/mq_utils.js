var amqp = require('amqplib');

var amqUrl = "amqp://xcweyitd:WZroDK9OzZ2Kih9qgOVbZ_hydHKwPFGq@salamander.rmq.cloudamqp.com/xcweyitd";
var connection = null

function start() {
    return new Promise(function (resolve, reject) {
        amqp.connect(amqUrl).then(con => {
            connection = con
            console.log("AMQP Connection Opened!")
            resolve(con)
        }
        )
    });
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

async function listenOnQueue(callbackFunc) {
    try {
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            callbackFunc(input)
            channel.ack(message);
        })
        console.log("Waiting for messages...")
    }
    catch (ex) {
        console.error(ex)
    }
}

exports.publishToQueue = publishToQueue;
exports.listenOnQueue = listenOnQueue;
exports.start = start;