$('document').ready(function(){
	$('.pastilleChoix').on('click touchstart', function(){
		var _this = $(this);
        alert(_this.text());
		createSession( function(){
			lancerDialogue(_this.text());
		});
	});	
});