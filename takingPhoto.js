var session;
var IP = "192.168.8.101";
// var IP = "local";
function disconnected() {
  console.log("disconnected");
}

$(document).ready(function(){
    createSession( function(){
        startSubscribe();
    });
});

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

function toTabletHandler(value) {
    // console.log("leftbumperPressed");
    console.log("PepperQiMessaging/totablet: " + value);
    document.getElementById('image').src = "../output.jpg?random="+new Date().getTime();
}

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

function sampleButtonClicked() {
        session.service("ALMemory").then(function (ALMemory) {
            // window.alert("ALMemory connected");
            ALMemory.raiseEvent("PepperQiMessaging/fromTablet", "1");
            console.log("ALMemory event raised");
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
