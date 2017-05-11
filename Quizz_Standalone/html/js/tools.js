var session;
var ip = "192.168.8.103";

$(document).ready(function(){
    createSession()
    var idleSeconds = 45;

    $(function(){
      var idleTimer;
      function resetTimer(){
        clearTimeout(idleTimer);
        idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
      }
      $(document.body).bind('mousemove keydown click',resetTimer); //space separated events list that we want to monitor
      resetTimer(); // Start the timer when the page loads
    });
});

function whenUserIdle(){
    session.service('ALMemory').then(function (alm){
    //setFocus sur le bon topic si jamais รงa ne marche pas
    // alert("Iddled")
    alm.raiseEvent("robotState", "777");
},function (error){
    alert(error);
    console.log(error);
});
  // raiseEvent("robotState","1")
}


function disconnected() {
  console.log("disconnected");
}

function getIntFromString (stringAParser){
	console.log(stringAParser);
		return parseInt(stringAParser.replace(/[^0-9\.]/g, ''), 10);
}

function createSession(callback){
	try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
			callback();
		});/*,disconnected,ip);*/
	}catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
};

function lancerDialogue(aDire){
	session.service('ALDialog').then(function (ald){
		//setFocus sur le bon topic si jamais รงa ne marche pas
		ald.forceInput(aDire);
	},function (error){
		alert(error);
		console.log(error);
  });
};

function raiseEvent(key,value){
    session.service('ALMemory').then(function (alm){
		//setFocus sur le bon topic si jamais รงa ne marche pas
		alm.raiseEvent(key, value);
	},function (error){
		alert(error);
		console.log(error);
  });
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
};

// function backDialog(){
    // if (!locked) {
        // locked = true;
        // var _this = $(this);
        // var redirection = "1;" + _this.attr("redirection");
        // var dialog = "20;" + _this.attr("dialog");
        // session.service('ALMemory').then(function( memory) {
            // memory.raiseEvent("dialogURL",redirection);
            // memory.raiseEvent("dialogEngaged",dialog);
        // }, function (error) {
            // console.log(error);
            // setTimeout(unlock, 2000);
        // });
    // }
// };