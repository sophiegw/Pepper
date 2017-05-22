var session;
var nbQuestions;
var bonneRep = 0;
var nbClick = 0;
var locked;
var lockExit = true;

$(document).ready(function(){
	$('.sortieQuestionnaire').css('cursor','default');
	lockButton();
	nbQuestions = $('body').data('nbquestions');
	try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
		});
	}catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
    init();
    // overflowing();
// $("#element").overflown();
// $.fn.overflown=function(){
//     var e=this[0];
//     return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth;}


});

function lockButton(){
	function toggleExit(){
		lockExit = false
	}
	setTimeout(toggleExit, 2000);
}

function overflowing(){
if ( $(window).height() <= $(document).height() ) { alert("too small")}
}

function init(){


    locked = false;
	
	$('.squaredImage').on('click touchstart', function(){
		if(!locked) {
			locked = true;
			var _this = $(this);
			_this.find("img").toggle();
        	setTimeout(unlock, 500);
        }
	});
	
	$('.submitAnswers').on('click touchstart', function(){
		if(!locked) {
			locked = true;
			nbClick++;
			
			var bonnesReponsesSoumises = 0;
			var mauvaiseRep = false;
			var _this = $(this);
			var derniereQuestion = _this.parent().data('derniere-question');
			var reponses = _this.parent('div').find('.coche:visible');
			
			var discours = _this.parent().find('[data-reponse=vrai]').data('value');
			var bonnesReponses = _this.parent().find('[data-reponse=vrai]');
			var nbBonnesRep = bonnesReponses.length;
			
			if(nbClick%2 === 1){
				_this.parent().find('.squaredImage').unbind('click touchend');
				$.each(reponses, function(reponses, reponse){
					var rep = $(reponse);
					rep.parent().siblings('img').css('visibility', 'visible');
					if(rep.parent().data("reponse") === "vrai"){
						bonnesReponsesSoumises++;
					}else{
						mauvaiseRep = true;
					}
				});
				
				$.each(bonnesReponses, function(bonnesReponses, bonneReponse){
					var bRep = $(bonneReponse);
					bRep.siblings('img').css('visibility', 'visible');
				});

				if((!mauvaiseRep) && (bonnesReponsesSoumises === nbBonnesRep)){
					bonneRep++;
				}
	            $('.submitAnswers').attr('src','../images/enter-arrow.png');
				if(session){
					sayAnswer(discours);
				}
			}   
			else{
				$('#next').click();
	            $('.submitAnswers').attr('src','../images/verify.png');
			}
			if(derniereQuestion){
				$('#out').css('display', 'inline');
				// $('.redirection').css('display', 'inline-block');
				_this.hide();
			}
			setTimeout(unlock, 500);
		}
	});
	
	$('#next').on('click', function(){
			var currentBlock = $('.propositionVisible:visible');
			var classes = currentBlock.attr('class').split(' ');
			var currentBlockNumber = getIntFromString(classes[1]);
			currentBlock.hide();
			nextBlockNumber = currentBlockNumber + 1;
			$('.question' + nextBlockNumber).show();
			if(nextBlockNumber === nbQuestions){
				$(this).hide();
			}
			window.scrollTo(0,0);
	});
	
	$('#out').on('click touchstart', function(){
		if(!locked) {
			locked = true;
			sayAnswer("Vous avez répondu correctement à \\pau=300\\" + bonneRep + " sur " + nbQuestions + "questions, soit un résultat de " + ((bonneRep/nbQuestions) * 100).toFixed(0) + " pourcents");
	        backDialog( $(this) );
	        setTimeout(unlock, 2000);
    	}
    });
	
	$('.redirection').on('click touchstart', function(){
		if(!locked) {
			locked = true;
		// var metier = $('body').data("metier");
		// window.location.href = "redirectionRH.html?" + metier;
	        session.service('ALMemory').then(function( memory) {
	            memory.raiseEvent("robotState","1");
	            }, function (error) {
	            console.log(error);
	        });
        	setTimeout(unlock, 500);
    	}
        // createSession(function(){
            // // raiseEvent("dialogEngaged","1;Accueil/Accueil_frf.top")
            // raiseEvent("robotState","1")
        // });
	});
    
    $('.sortieQuestionnaire').on('click touchstart', function(){
        if (!locked && !lockExit) {
            locked = true;
   			backDialog( $(this) );
            setTimeout(unlock, 2000);
        }
    });

    function backDialog(thisObj){
        var _this = thisObj;
        var redirection = "1;" + _this.attr("redirection");
        var dialog = "1;" + _this.attr("dialog");
        session.service('ALMemory').then(function( memory){
            memory.raiseEvent("dialogURL",redirection);
            memory.raiseEvent("dialogEngaged",dialog);
        }, function (error) {
            console.log(error);
        });
	}
};

function unlock () {
	locked = false;
};


function sayAnswer(answer) {
  session.service('ALTextToSpeech').then(function (tts) {
    tts.say(answer);
  }, function (error) {
    console.log(error);
  });
};