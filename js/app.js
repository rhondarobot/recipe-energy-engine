 $(function(){
 	//prevent page from reloading on 'submit'
 	$('#ingredient-search').submit(function(e){
 		e.preventDefault();	
 	var recipeSearch = $('#inputIngredient').val();
 	findRecipe(recipeSearch);
 	});
 });
 //still need to add the different parameters for the code to append to html table
var showRecipe = function(recipe) {
	//appending template to DOM when query deploys
	var recipeResults =  $('.templates .recipeResults').clone();

	//set the recipe results in 'results'
	var recipeName = recipeResults.find('.food-name a');
    recipeResultsElem.text(item.recipe.label);
    recipeResultsElem.attr('href',item.recipe.image);
    recipeResultsElem.html('href',item.recipe.shareAs);








    return recipeResults;
    console.log(recipeResults);
};	




 function findRecipe(recipeSearch) {
 	var recipeParams = {
 		q: recipeSearch,
 		'app-key': 'X1-ZWz19kmj7cegwb_1acr8',
		'app-id': '4bdd672f'
 	};

	$.ajax({
 		url: 'https://api.edamam.com/search',
 		data: recipeParams,
 		dataType: "jsonp",
 		type: "GET",
 	})	
 	.done(function(data){
 		console.log(data);
 		var inputRecipeResults = showRecipeResults(query,data.recipe.length);

 		$('.recipeResults').html(inputRecipeResults);
 		$.each(item.recipe,function(i, item){
 			var recipe = showRecipeResults(item);
 			$('.recipeResults').append(recipe);
 		}); 
 	})
};


