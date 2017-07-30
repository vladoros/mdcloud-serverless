'use strict';
const AWS = require('aws-sdk');
var rp = require('request-promise');
var config = require('./config');

module.exports.handler = (event, context, callback) => {
    const s3 = new AWS.S3();
    const sqs = new AWS.SQS();

    event.Records.forEach(record => {
        const params = { Bucket: record.s3.bucket.name, Key: record.s3.object.key };
        var response = {};

        s3.getObject(params, (err, data) => {
            rp.post({
                    url: config.uploadEndpoint,
                    formData: { file: data.Body },
                    headers: { apikey: config.apikey, filename: params.Key }
                })
                .then((data) => {
                    response.statusCode = 200;
                    const ctx = context.invokedFunctionArn.split(':');
                    const queueUrl = `https://sqs.${ctx[3]}.amazonaws.com/${+ctx[4]}/${process.env.sqs}`;
                    const dataId = JSON.parse(data).data_id;
                    console.log(dataId)
                    return sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: dataId }).promise();
                })
                .catch((e) => {
                    response = {
                        statusCode: 404,
                        body: e,
                    };
                    console.log(e);
                })
                .finally(() => callback(null, response));
        });
    });
};