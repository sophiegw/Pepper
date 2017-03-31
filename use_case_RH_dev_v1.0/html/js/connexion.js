var listeUtilisateur = ['lea', 'paola', 'pierre', 'clement', 'sophie']

$(document).ready(function(){
	var liste = [
		{"firstname": "gabriel", "lastname": "smith", "metier": "modelisateur"},
		{"firstname": "paola", "lastname": "pitault", "metier": "rh"} ,
		{"firstname": "Charlotte", "lastname": "Davain", "metier": "securite"},
		{"firstname": "cute", "lastname": "kitten", "metier": "securite"},
		{"firstname": "Jean-Eustache", "lastname": "De-la-Tourette", "metier": "modelisateur"},
		{"firstname": "king", "lastname": "harambe", "metier": "rh"},
		{"firstname": "Barbe", "lastname": "Glorieuse", "metier": "dataScientist"},
		{"firstname": "princesse", "lastname": "leia", "metier": "it"},
	]
	// localStorage.setItem('intervenantList', JSON.stringify(liste));
	init();
});

function init(){
	$('#adminConnection').show();
    // $('#body').show();
    
    
	$('input').on('keydown', function(e) {
        if (e.which == 13) { // Check for "Enter"
            e.preventDefault();
            var focus = $(document.activeElement)
            focusNext = focus.findNext("input")
            if(focusNext.length == "0")
                focus.blur(); // Leave input
            else
                focusNext.focus(); // Go to next input
        }
    });

    
	$('.close').on('click', function(){
		$('.inputUser').val('');
		$('#adminConnection').hide();
	});
    
	$('#submit').on('click', function(){
		var user = $('#idUser');
		var mdp = $('#motDePasse');

		if(!isInArray(user.val(), listeUtilisateur)){
			user.css('outline', '3px solid red');
			$('.ident').show();
		}else{
			user.css('outline', 'none');
			$('.ident').hide();
			if(mdp.val() !== 'pepperiscute'){
				mdp.css('outline', '3px solid red');
				$('.pwd').show();
			}else{
				mdp.css('outline', 'none');
				$('.pwd').hide();
				window.location.href = "index.html";
			}
		}
	});

    $.fn.findNextAll = function( selector ){
      var that = this[ 0 ],
        selection = $( selector ).get();
      return this.pushStack(
        !that && selection || $.grep( selection, function(n){
           return that.compareDocumentPosition(n) & (1<<2);
           // if you are looking for previous elements it should be & (1<<1);
        })
      );
    }
    
    $.fn.findNext = function( selector ){
      return this.pushStack( this.findNextAll( selector ).first() );
    }
};