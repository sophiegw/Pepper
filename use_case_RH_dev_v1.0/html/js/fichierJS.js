var session;

$(document).ready(function(){
	init();
	try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
		});
	} catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
});


function init(){
	$('.roundedImage').on('click', function(){
		var _this = $(this);
		var discours = '';
		var reponse = _this.data('reponse');
		var ensembleReponse = _this.parents('.jeuReponse');
		if(reponse === "fausse"){
			_this.siblings('img').css('visibility', 'visible');
			_this.css('background-color', '#D80027');
			var bonneRep = ensembleReponse.find('[data-reponse=vrai]');
			bonneRep.siblings('img').css('visibility', 'visible');
			bonneRep.css('background-color', '#91DC5A');
			discours = "La bonne réponse était " + bonneRep.data("value");
		}else if(reponse === "vrai"){
			_this.siblings('img').css('visibility', 'visible');
			_this.css('background-color', '#91DC5A');
			var rand = Math.floor((Math.random() * 5) + 1);
			switch (rand){
				case 1:
					discours = "Bravo";
					break;
				case 2:
					discours = "Bien joué";
				break;
				case 3:
					discours = "C'est ça !";
				break;
				case 4:
					discours = "Félicitation !";
				break;
				case 5:
					discours = "Bonne réponse !";
				break;
			}
		}
		ensembleReponse.find('[data-reponse]').each(function(){
			$(this).data("reponse", "finQuizz");
		});
		sayAnswer(discours);
		$('#next').show();
		$('#out').show();
	});
	$(".sortieQuestionnaire").on("click", function(){
		window.location.href = "../../listeDomaine.html";
	});
};


function sayAnswer(answer) {
  session.service('ALTextToSpeech').then(function (tts) {
    tts.say(answer);
  }, function (error) {
    console.log(error);
  });
};