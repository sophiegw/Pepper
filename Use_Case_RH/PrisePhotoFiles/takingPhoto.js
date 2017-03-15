var session;
var IP = "192.168.8.101";
// var IP = "local";
function disconnected() {
  console.log("disconnected");
}
// Call createSession and then startSubscribe
$(document).ready(function(){
    createSession( function(){
        startSubscribe();
    });
});

// Connect to the robot through QiSession
function createSession(callback) {
    try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
            callback();
		},disconnected,IP);
	}catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
}

// Refresh Image when called
function toTabletHandler(value) {
    // console.log("leftbumperPressed");
    console.log("PepperQiMessaging/totablet: " + value);
    document.getElementById('image').src = "output.jpg?random="+new Date().getTime();
}

// Start subsribing to event "PepperQiMessaging/toTablet" and callback "toTabletHandler"
function startSubscribe() {
    // window.alert("startsubscribe")
    session.service("ALMemory").then(function (ALMemory) {
      console.log("service ALMemory");
      ALMemory.subscriber("PepperQiMessaging/toTablet").then(function(subscriber) {
      // ALMemory.subscriber("LeftBumperPressed").then(function(subscriber) {
        console.log("Subscribed");
        subscriber.signal.connect(toTabletHandler);
      });
    });
}

// Raise Event "PepperQiMessaging/fromTablet" (which trigger the box TakePicture and save it to local output.jpg)
function sampleButtonClicked() {
        session.service("ALMemory").then(function (ALMemory) {
            // window.alert("ALMemory connected");
            ALMemory.raiseEvent("PepperQiMessaging/fromTablet", "1");
            console.log("ALMemory event raised");
  }, function (error) {
    console.log(error);
  })
};

// Nothing but saying chocolat
function speech() {
    session.service("ALTextToSpeech").then(function (tts) {
        tts.say("Chocolat");
  }, function (error) {
    console.log(error);
  })
};

// Force image reload manually
function forceReload() {
    //Change name of the src to force image to be reload even if cached by changing name
    document.getElementById('image').src = "output.jpg?random="+new Date().getTime();
}
