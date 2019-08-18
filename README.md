Notification panel is reachable via this link https://7gs4n54tbc.execute-api.us-east-1.amazonaws.com/dev/index.html?

Sms and Email is sending via Aws Lambda SNS and SES function. In static/index.js file ajax call (POST request) is made to https://inwrk9kgp6.execute-api.us-east-1.amazonaws.com/StageOne. 

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


