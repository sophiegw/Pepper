var storedPersons = JSON.parse(localStorage.getItem('intervenantList'));

$(document).ready(function(){
	trouverPhoto();
});

function trouverPhoto(){
	var origineRedirection = window.location.search;
	origineRedirection = origineRedirection.replace('?', '');
	
	var listeIntervenants = [];
	var rh = [];
	$.each(storedPersons, function(storedPersons, storedPerson){
		if(storedPerson.metier === origineRedirection){
			listeIntervenants.push(storedPerson);
		}
		if(origineRedirection !== 'rh' && storedPerson.metier === 'rh'){
			rh.push(storedPerson); 
		}
	});
	if(listeIntervenants.length === 0){
		listeIntervenants.push(rh[Math.floor((Math.random() * rh.length))]);
	}
	var intervenantChoisi = listeIntervenants[Math.floor((Math.random() * listeIntervenants.length))];
	$('#photoRedirection').attr('src', 'images/photos_RH/' + intervenantChoisi.firstname + '_' + intervenantChoisi.lastname + '_' + intervenantChoisi.metier + '.jpg');
	
	alert('images/photos_RH/' + intervenantChoisi.firstname + '_' + intervenantChoisi.lastname + '_' + intervenantChoisi.metier + '.jpg');
	
	
	var identite = "Pour plus de renseignement dans ce domaine, je vous invite à voir ";
	if(intervenantChoisi.metier === 'rh'){
		identite = identite + intervenantChoisi.firstname + " " + intervenantChoisi.lastname + ", RH présent(e) aujourd'hui sur ce forum.";
	}else{
		identite = identite + intervenantChoisi.firstname + " " + intervenantChoisi.lastname + ", expert(e) " + intervenantChoisi.metier + " présent(e) aujourd'hui sur ce forum.";
	}
	$('#nomIntervenant').text(identite);
};