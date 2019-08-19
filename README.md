<h2>AWS Lambda (Serverless) Notification Application</h2>

<p><b> Description:</b><br>
Enable users to get notifications via SMS, E-mail and browsers.  A simple notification panel in the front-end language of choice (e.g. JavaScript / HTML) and develop a back-end, based on AWS (lambda) serverless computing, that allows a back-office user to add notifications for particular users or for all users. Each notification comprises the following displayable fields: date-time, subject, type (this could be 'general', 'urgent', or anything else), description. The users should be able to see these notifications in their panel and also to receive them via SMS and/or email.
</p>

----------------------------------------------------------------------------------------------------------------------------------------

Lambda service is provided by Amazon that lets us execute and scale code efficiently. It is called a “serverless” service, but our code still runs on a server provisioned by Amazon, but we don’t manage it, maintain it or scale it. Amazon does all of this stuff automatically, so no matter how many people are using our site or service, it will NOT get overwhelmed.

It has an ability to use the Node runtime to execute JavaScript code. Amazon SNS, push notification service that is capable of sending iOS and Android push notifications. You can subscribe a Lambda to an SNS topic, executing whenever a message is sent.

It has an ability to use the Node runtime to execute JavaScript code. Amazon SNS, push notification service that is capable of sending iOS and Android push notifications. We can subscribe a Lambda to an SNS topic, executing whenever a message is sent.
 
Serverless APIs, where you have an API, and when it’s triggered, it starts a program that does a "server" thing when we don’t own a real phsical server.

In the words of Amazon; AWS Lambda is a compute service where you can upload your code to AWS Lambda and the service can run the code on your behalf using AWS infrastructure. After you upload your code and create what we call a Lambda function, AWS Lambda takes care of provisioning and managing the servers that you use to run the code. You can use AWS Lambda as follows:

<ul>
  <li>As an event-driven compute service where AWS Lambda runs your code in response to events, such as changes to data in an Amazon S3 bucket or an Amazon DynamoDB table.</li>
 <li>As a compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using AWS SDKs (This is exactly what I do; run code based on a HTTP request).</li>
</ul>
<br>

<p><b>Project Details</b></p>
Notification panel is reachable via this link https://7gs4n54tbc.execute-api.us-east-1.amazonaws.com/dev/index.html. The link is reachable from everywhere including Android, IOS phones and tabs. The only thing you should do is to allow notifications and to enter required information from the panel! If you want to get notifications via email and sms, please enter your phone number in E.164 format (E.g: +35611113333) and your email address. But your email has to be reqistered to AWS, otherwise you will not get any emails. SMSSENDERID is limited to 11 alphanumeric characters; using more than 11 alphanumeric chars will be resulted in error. 

Sms and Email is being sent via Aws Lambda SNS and SES function. In static/index.js file ajax call (POST request) is made to https://inwrk9kgp6.execute-api.us-east-1.amazonaws.com/StageOne. 

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
  <li>Install and authenticate aws-cli</li>
  <li>Install and configure Serverless (https://serverless.com)</li>
</ul>


