$('document').ready(function(){
	var provenance = window.location.search;
	
    // var param = provenance.split("?")
    // var query = location.search.substr(1);
    // var result = {};
    // query.split("&").forEach(function(part) {
    // var item = part.split("=");
    // result[item[0]] = decodeURIComponent(item[1]);
  // });
    //alert(param[1])
    
	$('.pastilleChoix').on('click', function(){	
		var _this = $(this);
        var aDire = "\""+ _this.attr("name") + "\"";
		createSession( function(){
			lancerDialogue(aDire);
		});
	});
    
	
});