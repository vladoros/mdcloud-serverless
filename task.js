'use strict';
const AWS = require('aws-sdk');
var rp = require('request-promise');
var config = require('./config');
var errors = require('request-promise/errors');

module.exports.handler = (event, context, callback) => {
    const sns = new AWS.SNS();
    const s3 = new AWS.S3();
    const sqs = new AWS.SQS();
    var response = {};
    if (event && event.length > 0) {
        var url = `${config.api}/v2/file/${event[0].Body}`;
        const ctx = context.invokedFunctionArn.split(':');
        response.QueueUrl = `https://sqs.${ctx[3]}.amazonaws.com/${+ctx[4]}/${process.env.sqs}`;
        response.ReceiptHandle = event[0].ReceiptHandle;
        return rp.get({
                url: url,
                headers: { apikey: config.apikey }
            })
            .then((data) => parseResult(data))
            .catch((e) => {
                console.log(e);
            })
            .finally(() => callback(null, response));
    }

    function parseResult(data) {
        const res = JSON.parse(data);
        if (res && res.scan_results && res.scan_results.progress_percentage === 100) {
            response.data = JSON.stringify(res, null, 2);
            return sns.createTopic({ Name: config.snsEmail }, sendEmail).promise();
        }
    }

    function sendEmail(e, t) {
        sns.publish({ TopicArn: t.TopicArn, Message: response.data, Subject: 'New file uploaded' },
                () => sqs.deleteMessage({ QueueUrl: response.QueueUrl, ReceiptHandle: response.ReceiptHandle }).promise())
            .send();
    }
};