navigator.serviceWorker.register('service-worker.js');

/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

navigator.serviceWorker.ready
  .then(function (registration) {
    return registration.pushManager.getSubscription()
      .then(async function (subscription) {
        if (subscription) {
          console.log('got subscription!', subscription)
          return subscription;
        }
        const response = await fetch('./vapidPublicKey');
        const vapidPublicKey = await response.text();
        console.log('decoding:', vapidPublicKey)
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
        console.log('got vapidPublicKey', vapidPublicKey, convertedVapidKey)

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
      });

  }).then(function (subscription) {
    console.log('register!', subscription)
    fetch('./register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription
      }),
    });
	
	// I added this part for testing
    //document.getElementById('doIt').onclick = function () {		
      //const payload = document.querySelector('form').querySelector('#message').value;
	  //const payloadSubject = document.querySelector('form').querySelector('#subject').value;
      //const delay = '5'
      //const ttl = '5'
      //fetch('./sendNotification', {
        //method: 'post',
        //headers: {
          //'Content-type': 'application/json'
        //},
        //body: JSON.stringify({
          //subscription: subscription,
          //payload: payload,
		  //payloadSubject: payloadSubject,
          //delay: delay,
          //ttl: ttl,
        //}),
      //});
    //};

    document.getElementById('sendToAll').onclick = function () {
		
		var form = document.querySelector('form');
		var notType = form.querySelector('#theme').value;
		var sentTime = form.querySelector('#sendDateTime').value;
		
		if(form.querySelector('#email').value != null && form.querySelector('#email').value != "" && form.querySelector('#mobile').value != null && form.querySelector('#mobile').value != ""){
			
				$.ajax({
                    type: "POST",
                    url: 'https://inwrk9kgp6.execute-api.us-east-1.amazonaws.com/StageOne',
                    contentType: 'application/json',
                    data: JSON.stringify({
						'mobile': form.querySelector('#mobile').value,
						'senderId':form.querySelector('#senderId').value,
                        'receiverEmail': form.querySelector('#email').value,
                        'notificationType': notType,
                        'message': form.querySelector('#message').value,
						'sendDateTime': sentTime,
						'subject': form.querySelector('#subject').value,
                    })
					,
                    success: function(res){
						setTimeout(function(){
							$('#form-response').text('Email and Sms were sent.');
						 },2000);
                    },
                    error: function(){
						setTimeout(function(){
							$('#form-response').text('Error.');
						},2000);
                    }
                });
		}
		
	  const payload = form.querySelector('#message').value;
	  const payloadSubject = form.querySelector('#subject').value;
      fetch('./sendToAll', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          payload: payload,
		  payloadSubject: payloadSubject,
		  notificationType: notType,
		  sentDateTime: sentTime,
          delay: 0,
        }),
      });
    };

  });