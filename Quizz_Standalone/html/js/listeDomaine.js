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
});
	