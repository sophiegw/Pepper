$('document').ready(function(){

    var locked = false;
    $('.pastilleChoix').on('click', function(){
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