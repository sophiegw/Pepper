var session;

$(document).ready(function(){
	try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
		});
	} catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
    
    startSubscribe();
});


function toTabletHandler(value) {
    console.log("PepperQiMessaging/totablet: " + value);
    document.getElementById('image').src = "../output.jpg?random="+new Date().getTime();
}

function startSubscribe() {
    session.service("ALMemory").then(function (ALMemory) {
      console.log("ALMemory");
      ALMemory.subscriber("PepperQiMessaging/totablet").then(function(subscriber) {
        subscriber.signal.connect(toTabletHandler);
      });
    });
}

function sampleButtonClicked() {
        session.service("ALMemory").then(function (ALMemory) {
          window.alert("ALMemory connected");
          console.log("ALMemory event raised");
          ALMemory.raiseEvent("PepperQiMessaging/fromtablet", "");
  }, function (error) {
    console.log(error);
  })
};

function speech() {
    session.service("ALTextToSpeech").then(function (tts) {
        tts.say("Chocolat");
  }, function (error) {
    console.log(error);
  })
};

function forceReload() {
    //Change name of the src to force image to be reload even if cached by changing name
    document.getElementById('image').src = "../output.jpg?random="+new Date().getTime();
}