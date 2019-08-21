<h2>AWS Lambda (Serverless) Notification Application</h2>

<p><b> Description:</b><br>
Enable users to get notifications via SMS, E-mail and browsers.  A simple notification panel in the front-end language of choice (e.g. JavaScript / HTML) and develop a back-end, based on AWS (lambda) serverless computing, that allows a back-office user to add notifications for particular users or for all users. Each notification comprises the following displayable fields: date-time, subject, type (this could be 'general', 'urgent', or anything else), description. The users should be able to see these notifications in their panel and also to receive them via SMS and/or email.
</p>

----------------------------------------------------------------------------------------------------------------------------------------
Serverless architecture is also called FaaS (function as a service).

Lambda service is provided by Amazon that lets us execute and scale code efficiently. It is called a “serverless” service, but our code still runs on a server provisioned by Amazon, but we don’t manage it, maintain it or scale it. Amazon does all of this stuff automatically, so no matter how many people are using our site or service, it will NOT get overwhelmed.

It has an ability to use the Node runtime to execute JavaScript code. Amazon SNS, push notification service that is capable of sending iOS and Android push notifications. You can subscribe a Lambda to an SNS topic, executing whenever a message is sent.

It has an ability to use the Node runtime to execute JavaScript code. Amazon SNS, push notification service that is capable of sending iOS and Android push notifications. We can subscribe a Lambda to an SNS topic, executing whenever a message is sent.
 
Serverless APIs, where you have an API, and when it’s triggered, it starts a program that does a "server" thing when we don’t own a real phsical server.

In the words of Amazon; AWS Lambda is a compute service where you can upload your code to AWS Lambda and the service can run the code on your behalf using AWS infrastructure. After you upload your code and create what we call a Lambda function, AWS Lambda takes care of provisioning and managing the servers that you use to run the code. You can use AWS Lambda as follows:

<ul>
  <li>As an event-driven compute service where AWS Lambda runs your code in response to events, such as changes to data in an Amazon S3 bucket or an Amazon DynamoDB table.</li>
 <li>As a compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using AWS SDKs (This is exactly what I do; run code based on a HTTP request).</li>
</ul>

----------------------------------------------------------------------------------------------------------------------------------------
<h3><b>Project Details</b></h3>
Notification panel is reachable via this link https://7gs4n54tbc.execute-api.us-east-1.amazonaws.com/dev/index.html. The link is reachable from everywhere including Android, IOS phones and tabs. The only thing you should do is to allow notifications and to enter required information from the panel! If you want to get notifications via email and sms, please enter your phone number in E.164 format (E.g: +35611113333) and your email address. But your email has to be reqistered to AWS, otherwise you will not get any emails. SMSSENDERID is limited to 11 alphanumeric characters; using more than 11 alphanumeric chars will be resulted in error. 

Sms and Email is being sent via Aws Lambda SNS and SES function. In static/index.js file ajax call (POST request) is made to https://inwrk9kgp6.execute-api.us-east-1.amazonaws.com/StageOne. 

SNS publish is picked up by a listener Lambda, which in turn re-publishes the message to a separate topic a set number of times, depending on how many subscribers there are. The broadcast Lambda attached to that topic is then run multiple times in parallel, encrypting the payload and sending to each individual Web Push client, using the web-push library. 

SNS organizes around topics. A topic groups together messages of the same type which might be of interest to a set of subscribers. In case of a new message being published to a topic, SNS will notify all subscribers. We can configure delivery policies including configuration of maximum receive rates and retry delays.SNS topic subscriptions support multiple protocols: http, https, email, email-json, sms, sqs, application, lambda.

TODO:
We can also subscribe an SQS queue to the topic, storing the events for asynchronous processing by, e.g., another Lambda function or a long running polling service. In this case we would use the sqs protocol and provide both the topic and the queue endpoint. SNS provides pub/sub functionality to decouple producers and consumers, while SQS gives us the ability to process events asynchronously. This provides persistency. Also we could save the messages to DynamoDB. I am currently working on these.

<h3>Requirements</h3>
<ul>
  <li>AWS Account</li>
  <li>Node.js knowledge</li>
  <li>Web push for sending browser notifications (Aws SNS (notification service) doesn't support browser notification for this reason I decided to service worker)</li>
  <li>VAPID (Voluntary Application Server Identification)</li>
  <li>AWS API Gateway</li>
  <li>AWS CloudWatch (to check the message details in CloudWatch service.)</li>
</ul>

<h3>Setup</h3>
<ul>
  <li>Install and authenticate aws-cli (Unified tool to manage multiple AWS services. https://aws.amazon.com/cli/)
<p>$ aws configure
<br>AWS Access Key ID [None]: (can be obtained and downloaded from AWS Console)
<br>AWS Secret Access Key [None]: (can be obtained and downloaded from AWS Console)
<br>Default region name [None]: us-west-2 (depending on your region)
<br>Default output format [None]: json</p></li>
  <li>Install and configure Serverless (https://serverless.com) ("The Serverless Framework consists of an open source CLI that makes it easy to develop, deploy and test serverless apps across different cloud providers, as well as a hosted Dashboard that includes features designed to further simplify serverless development, deployment, and testing, and enable you to easily secure and monitor your serverless apps.")<br>Make changes on your code and deploy just typing sls deploy</li>
</ul>

The Serverless Framework helps us develop and deploy our AWS Lambda functions (in my case Lambda function is called processContactFormRequest > awsMailAndSmsSenderFunction.js), along with the AWS infrastructure resources they require. It's a CLI that offers structure, automation and best practices out-of-the-box, allowing us to focus on building sophisticated, event-driven (this way we can split our apllication to smaller modules which helps us to build microservice friendly apps), serverless architectures, comprised of Functions and Events. 

A Service is the Framework's unit of organization. You can think of it as a project file, though you can have multiple services for a single application. It's where you define your Functions, the Events that trigger them, and the Resources your Functions use, all in one file entitled serverless.yml.
When we deploy with the Framework by running "serverless deploy" command in CLI, everything in serverless.yml is deployed at once.
To create serverless.yml: <br>
// handler.js <br>
module.exports.functionOne = function(event, context, callback) {};<br>

// serverless.yml<br>
<p>functions:</p>
   <p style="margin-left:50px;">functionOne:</p>
   <p style="text-indent:100px;">handler: handler.functionOne</p><br>


A Function is an AWS Lambda function. It's an independent unit of deployment, like a microservice. It's merely code, deployed in the cloud, that is most often written to perform a single job: In my case sending notifications to users (I am sending sms email and web notifications from the same module, actually this is not recommended. So as to do or maintenance work I will split these three into 3 different modules)

Anything that triggers an AWS Lambda Function to execute is regarded by the Framework as an Event. Events are infrastructure events on AWS such as:

<ul>
  <li>An AWS API Gateway HTTP endpoint request (e.g., for a REST API)</li>
<li>An AWS S3 bucket upload (e.g., for website)</li>
<li>A CloudWatch timer (e.g., run every 5 minutes)</li>
<li>An AWS SNS topic (e.g., an sms message or simple notification)</li>
<li>A CloudWatch Alert (e.g., something happened)</li>
 </ul>
 
 VAPID
 SERVICE WORKERS

<h3>Some of the problems I have faced</h3>

In order to make AWS Lambdas accessible through HTTP we need to use the AWS API Gateway. While Serverless handles all this mapping for us, the API gateway itself is frustrating to use. For instance, it is not possible to specify the HTTP status code of a response from within our Lambda. Instead, we must set up a series of templates in the API Gateway that are based around regexes of the response body.

There is no support for Browser notifications by SNS. There are a few solutions like deepstreamhub and pushkin but these are still ongoing projects on Github. Other choices are AWS IOT Websockets and AWS AppSync (new release). It took me a long time find a proper solutuion and in the end I came up with Serverless.com and service workers. If you have a better solution for serverless web notifications, please do not hesitate to share your ideas. 

