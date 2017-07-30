'use strict';
const Lawos = require('lawos');
const AWS = require('aws-sdk');
const SQS = new AWS.SQS();
const Lambda = new AWS.Lambda();

module.exports.handler = (event, context, callback) => {
    const ctx = context.invokedFunctionArn.split(':');
    const queueUrl = `https://sqs.${ctx[3]}.amazonaws.com/${+ctx[4]}/${process.env.sqs}`;
    const queue = new Lawos(queueUrl, SQS, Lambda);

    queue.item(item => new Promise(done => done()));
    queue.list("task");
    queue.work(() => Promise.resolve(context.getRemainingTimeInMillis() < 1000))
        .then((data) => {
            console.log(data);
            callback(null, data);
        });
};