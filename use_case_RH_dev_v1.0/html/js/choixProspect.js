$(document).ready(function(){
	$('#video').on('click', function(){
		createSession( function(){
			lancerDialogue("video");
		});
	});
	
	
	$('.choixProspect').on('click', function(){
		var _this = $(this);
		var aDire = "\"" + _this.siblings('span').text() + "\"";
		createSession( function(){
			lancerDialogue(aDire);
		});
	});	
});