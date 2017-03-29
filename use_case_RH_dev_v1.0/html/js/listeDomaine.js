$(document).ready(function(){
	$(".content").fadeIn("slow");
    
    $('.domaine').on('click', function(){
		var _this = $(this);
		createSession( function(){
			lancerDialogue("\"" + _this.text() + "\"");
		});
	});	
    
    
    var idleSeconds = 15;

    $(function(){
      var idleTimer;
      function resetTimer(){
        clearTimeout(idleTimer);
        idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
      }
      $(document.body).bind('mousemove keydown click',resetTimer); //space separated events list that we want to monitor
      resetTimer(); // Start the timer when the page loads
    });

    function whenUserIdle(){
        session.service('ALMemory').then(function (alm){
		//setFocus sur le bon topic si jamais รงa ne marche pas
		alm.raiseEvent("robotState", "1");
	},function (error){
		alert(error);
		console.log(error);
    });
      // alert("Iddled")
      // raiseEvent("robotState","1")
    }
});
	