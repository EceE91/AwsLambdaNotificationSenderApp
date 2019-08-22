
//  API Gateway (as POST request) endpoint to accept requests and set it as the trigger for lambda function
var AWS = require('aws-sdk')
var http = require( 'http' )
var ses = new AWS.SES() // aws email service
var sns = new AWS.SNS() // aws sms/notification service

var SENDER = 'eceercan91@hotmail.com'; // the sender email is properly set up in your Amazon SES

exports.handler = (event, context, callback) => {
    
    // the request payload received by the API will be injected to 
    // the lambda function as the event object. 
    // we only have to extract the information from the event object 
    // and assign them to variables for further
    
    console.log('Received event:', event);
    
    // Transactional type should be used for Critical messages that support customer transactions
    // Promotional type used for non-critical messages, such as marketing messages
    let isPromotional = true;
  
   
    sendEmail(event, function (err, data) {
        var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://example.com' },
            "statusCode": 200,
            "body": "{\"result\": \"Success.\"}"
        };
        callback(err, response);
    });
    
    sendSms(event,function (err, data) {
        callback(err, data);
    });
   
};


function sendSms(event,callback){
    var data = event;
    console.log("Sending sms message", data.message, "to receiver", data.mobile);

    // mobile number has to be E.164 formatted

    sns.publish({
        Message: 'Subject: '+ data.subject + '\nNotification Type: ' + data.notificationType 
        + '\nMessage: ' + data.message + '\nSent DateTime: ' + data.sendDateTime,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': data.senderId
            }
        },
        PhoneNumber: data.mobile
    }).promise()
        .then(data => {
            console.log("Sent message to", data.mobile);
            callback(null, data);
        })
        .catch(err => {
            console.log("Sending failed", err);
            callback(err);
        });

    callback(null, { "notification": "Successfully executed" });
}


function sendEmail (event, done) {
    var data = event;
    
    var params = {
        Destination: {
            ToAddresses: [data.receiverEmail] // this is a list, so we can send email to multiple email addresses
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Notification Type: ' + data.notificationType + '\nReceiver of the Email: ' + data.receiverEmail 
                    + '\nMessage: ' + data.message + '\nSent DateTime: ' + data.sendDateTime,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Subject: ' + data.subject,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    ses.sendEmail(params, done);
}

