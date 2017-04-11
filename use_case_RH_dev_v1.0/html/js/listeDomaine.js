$(document).ready(function(){
	$(".content").fadeIn("slow");
    
    
    var locked = false;
    $('.dialogable').on('click', function(){
        if (!locked) {
            locked = true;
            var _this = $(this);
            var aDire = "\""+ _this.attr("name") + "\"";
            createSession( function(){
                lancerDialogue(aDire);
            });
            setTimeout(unlock, 2000);
        }
	});

    function unlock () {
        locked = false;
    }


    // var idleSeconds = 45;

    // $(function(){
      // var idleTimer;
      // function resetTimer(){
        // clearTimeout(idleTimer);
        // idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
      // }
      // $(document.body).bind('mousemove keydown click',resetTimer); //space separated events list that we want to monitor
      // resetTimer(); // Start the timer when the page loads
    // });

    // function whenUserIdle(){
        // session.service('ALMemory').then(function (alm){
            // //setFocus sur le bon topic si jamais รงa ne marche pas
            // alm.raiseEvent("robotState", "1");
        // },function (error){
            // alert(error);
            // console.log(error);
        // });
      // // alert("Iddled")
      // // raiseEvent("robotState","1")
    // }
});
	