var session;
var totalNumberOfQuestion = 0;
var visible = false;
// var IP = "192.168.8.103";
// var conseils;

function disconnected() {
  console.log("disconnected");
}

$(document).ready(function(){
	totalNumberOfQuestion = $('.question').length;
    try {
		QiSession( function (s) {
			console.log('connected!');
			session = s;
		// },disconnected,IP);
		});
	}catch (err) {
	  console.log("Error when initializing QiSession: " + err.message);
	  console.log("Make sure you load this page from the robots server.");
	}
    init();
});

function init(){
		
	$('select').on('change', function(){
		var _this = $(this);
		var score = _this.parents().next('.score');
		var avancement = _this.parents().nextAll('.avancement');
		var choice = _this.val();
		var currentTable = _this.closest('tbody');
		var totalTableScore = currentTable.find('.score');
		var totalTableAvancement = currentTable.find('.avancement');
		
		var tableNumberOfQuestion = totalTableScore.length;
		var currentTableScore = 0;
		var currentTableAvancement = 0;
		
		var icon='';
		var color='black';
		
		if(choice === 'notAnswered'){
			score.text('--');
			avancement.text('--')
		}else if(choice === 'yes'){
			score.text(_this.find(':selected').data('score'));
			avancement.text(1);
		}else if(choice === 'no'){
			score.text(_this.find(':selected').data('score'));
			avancement.text(1);
		}else{
			score.text(_this.find(':selected').data('score'));
			avancement.text(1);
		}
		$.each(totalTableScore, function(totalTableScore, currentScore){
			var score = $(currentScore);
			if(score.html() !== '--'){
					currentTableScore = currentTableScore + parseFloat(score.html(), 10);
			}
		});
				
		$.each(totalTableAvancement, function(totalTableAvancement, currentAvancement){
			var avancement = $(currentAvancement);
			if(avancement.html() !== '--'){
					currentTableAvancement = currentTableAvancement + parseFloat(avancement.html(), 10);
			}
		});
				
		if(currentTableScore >= 5){
			icon = '<i class="fa fa-smile-o" aria-hidden="true"></i>';
			color='green';
		}else if(currentTableScore >= 3){
			icon = '<i class="fa fa-meh-o" aria-hidden="true"></i>';
		}else{
			icon = '<i class="fa fa-frown-o" aria-hidden="true"></i>';
			color='red';
		}
		
		currentTable.find('.smiley').html(icon).css('color', color);
		currentTable.find('.finalScore').html(currentTableScore);
		currentTable.find('.finalAvancement').text(currentTableAvancement + "/" + tableNumberOfQuestion);
		_this.trigger('updateAnswers');
	});
	
	$('select').on('updateAnswers', function(){
		$('#warning').hide();		
		var allAvancement = $('.finalAvancement');
		var sumProgress = 0;
		
		var allScores = $('.finalScore');
		var sumScores = 0;
		
		var icon = '';
		var color = 'black';
		$.each(allAvancement, function(allAvancement, avancementTable){
			var avancement = $(avancementTable);
			if(avancement.html() !== '--'){
					var valeur = avancement.html().split('/');
					sumProgress = sumProgress + parseInt(valeur[0], 10);
			}
		});
		
		$.each(allScores, function(allScores, scoreTable){
			var score = $(scoreTable);
			if(score.html() !== '--'){
					sumScores = sumScores + parseFloat(score.html(), 10);
			}
		});
		
		if(sumScores >= 15){
			icon = '<i class="fa fa-smile-o" aria-hidden="true"></i>';
			color='green';
		}else if(sumScores >= 8){
			icon = '<i class="fa fa-meh-o" aria-hidden="true"></i>';
		}else{
			icon = '<i class="fa fa-frown-o" aria-hidden="true"></i>';
			color='red';
		}
		
		var progressPercent = ((sumProgress/totalNumberOfQuestion) * 100).toFixed(2);
		$('#finalSmiley').html(icon).css('color', color);
		$('#totalProgress').text(progressPercent + '%');
		$('#totalScore').text(sumScores);
	});
	
	
	$('#toAdvices').on('click', function(){
		var progres = parseFloat($('#totalProgress').html(), 10);
		var spans = $('.test');
		
		if(visible)
		{
			spans.empty();
			$('.test').empty();
			visible = false;
		}
		if(progres < 100 || isNaN(progres)){
			$('#warning').show();
		}else{
			$('#warning').hide();
			var conseils = [];
			var total = parseFloat($('#totalScore').html(), 10);
			var scores = $('.finalScore');
			var passedXp = true;
			var valeur = true;
			var companyValues = $('.companyValue');
			$.each(companyValues, function(companyValues, companyValue){
				var value = $(companyValue);
				if(value.val() === "no"){
					valeur = false;
				}
			});
			
			
			var knowledge = $('.knowledge');
						
			var qualities = $('.quality');
			var experiences = $('.experience');
			
			$.each(experiences, function(experiences, experience){
				var xp = $(experience);
				if(xp.val() === "no"){
					passedXp = false;
				}
			});

			if(total >= 14){
				conseils.push("Vous semblez déjà bien préparé pour vous rendre à cet entretien. Bravo ! Restez concentré sur l'objectif pour être performant le jour J. ");
			}else if((parseFloat($(scores[0]).html(),10) <= 3) || (parseFloat($(scores[1]).html(), 10) <= 3) || (parseFloat($(scores[2]).html(), 10) <= 4)){
				conseils.push("Vous ne semblez pas encore prêt pour aller à cet entretien en ayant toutes les chances de votre côté. Nous vous engageons à prendre plus d'informations.");
			}else{
				conseils.push("Vous avez déjà bien avancé dans votre préparation à cet entretien professionnel. Vous avez encore des axes de progression pour être plus performant.");
			}
			
			if(!passedXp){
				conseils.push("Vous devez être capable d'expliquer en quoi vos expériences passées en entreprise servent votre nouveau projet.");
			}
			
			if(($(qualities[0]).val() === "no")){
				conseils.push("Réfléchissez à vos qualités et vos défauts par rapport au poste sur lequel vous postulez, et soyez en mesure de les illustrer par des exemples concrets...");
			}
			
			// if(($(knowledge[0]).val() === "no") && ($(knowledge[1]).val() === "no") && ($(knowledge[2]).val() === "no")){
			// 	conseils.push("N'hésitez pas à parler de votre projet à votre entourage ou à solliciter les anciens de votre école, qui pourront vous conseiller et vous aider à préparer votre entretien.");
			// }
			
			// if($('#nomCeo').val() === "no"){
			// 	conseils.push("Attention, il est important de connaître le nom du dirigeant de l'entreprise : c'est un détail qui compte et qui montre que vous vous êtes renseigné.");
			// }
			
			if(!valeur){
				conseils.push("Pour réussir votre entretien, vous devez démontrer que votre parcours et votre personnalité sont en phase avec les valeurs de l'entreprise. Prenez le temps d'y réfléchir pour apporter une réponse concrète.");
			}
			for(var i = 0; i < conseils.length; i++){
					$('#conseil' + i).html(conseils[i]);
			}
			visible = true;
			// sayResult();
		}
	});
	
    $('.sortieQuestionnaire').on('click', function(){
        backDialog( $(this) );
    });

    function sayResult(){
		session.service('ALTextToSpeech').then(function (tts){
		tts.say(conseils)
		},function (error){
			alert(error);
			console.log(error);
	  });
    }

    locked = false;
    function backDialog(thisObj){
        if (!locked) {
            locked = true;
            var _this = thisObj;
            var redirection = "1;" + _this.attr("redirection");
            var dialog = "1;" + _this.attr("dialog");
            try {
                session.service('ALMemory').then(function(memory){
                    memory.raiseEvent("dialogURL",redirection);
                    memory.raiseEvent("dialogEngaged",dialog);
                }, function (error) {
                    alert(error);
                    console.log(error);
                    setTimeout(unlock, 2000);
                });
            } catch(err){
                alert(err);
                alert(err.message);
            }
        }
    };
    
    function unlock () {
    locked = false;
    }
};







