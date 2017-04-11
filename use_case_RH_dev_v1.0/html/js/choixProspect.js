$(document).ready(function(){
	$('#video').on('click', function(){
		createSession( function(){
			lancerDialogue("video");
		});
	});
	
	
	// $('.choixProspect').on('click', function(){
		// var _this = $(this);
		// // var aDire = "\"" + _this.siblings('span').text() + "\"";
        // var aDire = "\""+ _this.attr("name") + "\"";
		// createSession( function(){
			// lancerDialogue(aDire);
		// });
	// });	
    var locked = false;
    $('.choixProspect').on('click', function(){
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