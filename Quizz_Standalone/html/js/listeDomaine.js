$(document).ready(function(){
	$(".content").fadeIn("slow");
    $('#exitApplication').css('cursor','default');

    var locked = false;
    $('.dialogable').on('click touchend', function(){
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
});