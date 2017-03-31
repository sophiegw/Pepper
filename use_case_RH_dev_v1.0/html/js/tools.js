var session;
var ip = "192.168.8.103";

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