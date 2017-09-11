# Integrating Metadefender Cloud API serverless architecture

Managed file transfer solutions are one of the basic services every modern application needs to offer. Whether it's provided via integrations with other services or simple personal file uploads, threat detection can help protect user and application data. In [this article](https://opswat.com/blog/how-integrate-metadefender-cloud-api-serverless-architecture), we demonstrate how organizations can reduce the threat of malware infection using the Metadefender Cloud API in a serverless architecture.

## Metadefender Cloud API Key

In order to use [Metadefender Cloud Public APIs](https://www.metadefender.com/public-api#!/about), you have to first register for OPSWAT account. Following process describes how to obtain your API key:

1. Visit [Metadefender.com](https://www.metadefender.com/) and click on **Sign Up**
2. You will be redirected to [OPSWAT](https://www.opswat.com/) community [registration page](https://go.opswat.com/communityRegistration) and asked to create free **OPSWAT account**. This account grants you access to all OPSWAT Cloud products.
3. Fill out the registration form and follow the process
4. After confirmation of your email, visit [Metadefender.com](https://www.metadefender.com/) and login with your new account
5. Visit your [account page](https://www.metadefender.com/account/#!/) and you will see your API key

## Metadefender Cloud API Documentation

1. [Scanning a file by file upload](https://www.metadefender.com/public-api#!/scanning-a-file-by-file-upload)
2. [Retrieving scan reports](https://www.metadefender.com/public-api#!/retrieve-scan-report-using-data-id)

## Serverless AWS credentials setup

The Serverless Framework needs access to your cloud provider's account so that it can create and manage resources on your behalf.

Make sure you've completed their [basic setup](https://serverless.com/framework/docs/providers/aws/guide/credentials#amazon-web-services) first.

## Run the code

```
> git clone
> npm install
$ serverless deploy
```