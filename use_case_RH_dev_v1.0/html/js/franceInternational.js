$('document').ready(function(){
		
	$('.pastilleChoix').on('click', function(){	
		var _this = $(this);
		createSession( function(){
			lancerDialogue(_this.text());
		});
	});	
	
});