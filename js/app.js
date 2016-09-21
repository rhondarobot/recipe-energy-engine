 $(function(){
 	//prevent page from reloading on 'submit'
 	$('#house-search').submit(function(e){
 		e.preventDefault();	
 	var recipeSearch = $('ingredient-search').val();
 	findRecipe(recipeSearch);
 	});
 });


 //still need to add the different parameters for the code to append to html table




 function findRecipe(recipeSearch) {
 	var recipeParams = {
 		q: recipeSearch,
 		app-key: 'X1-ZWz19kmj7cegwb_1acr8',
		app-id: '4bdd672f'
 	};

 $.ajax({
 		url: 'https://api.edamam.com/search'
 		data: params,
 		dataType: "jsonp",
 		type: "GET",
 	})	
 //.done(function(searchresults){
 //	var searchResults = showResults(params.citystatezip, searchresults.items.length);
 //	$('.house-results').html(searchResults);
 //})



// };//end of code
