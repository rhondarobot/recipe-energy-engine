 $(function(){
 	//prevent page from reloading on 'submit'
 	$('#ingredient-search').submit(function(e){
 		e.preventDefault();	
 	var recipeSearch = $('#inputIngredient').val();
 	findRecipe(recipeSearch);	
 	});
 });
 //still need to add the different parameters for the code to append to html table
var showRecipe = function(item) {
	//appending template to DOM when query deploys
	var recipeResults =  $('.templates .recipeResults').clone();

	//set the recipe results in 'results'
	var recipeLink = recipeResults.find('.recipe-link a');
    recipeLink.attr('href',item.recipe.uri);
    recipeLink.text(item.recipe.label);

    var recipeImage = recipeResults.find('.recipe-image img');
    recipeImage.attr('src',item.recipe.image);

    var recipeLink = recipeResults.find('.recipe-link a');
    recipeLink.attr('href',item.recipe.uri);
    recipeLink.text(item.recipe.label);

    var recipeYield = recipeResults.find('.yield');
    recipeYield.text(item.recipe.yield + ' people');

    var recipeKCal = recipeResults.find('.calories');
    recipeKCal.text(Math.round(item.recipe.calories));

    var servingKcals = item.recipe.calories/item.recipe.yield;
    	$('.serving-calories').html(servingKcals);
    
    var ingredientCount = recipeResults.find('.ingredients-count');
    ingredientCount.text('(' + item.recipe.ingredients.length + ')');

    var recipeIngredients = recipeResults.find('.ingredients');
    recipeIngredients.text(item.recipe.ingredientLines);

    var recipeType = recipeResults.find('.diet-type');
    recipeType.text(item.recipe.dietLabels);
    	//add string to 0 length arrays so item will not be blank
    	if (item.recipe.dietLabels.length === 0) {
    		$('.diet-type').html('Not Applicable');
    	};
    
    var recipeHealth = recipeResults.find('.health-label');
    recipeHealth.text(item.recipe.healthLabels);

    var recipeMeasurement = recipeResults.find('.measurement');
    recipeMeasurement.text(Math.round(item.recipe.totalWeight) + 'g');



    





    var nutritionLabel = recipeResults.find('.nutrition-label');
    //move this to the bottom or side-bottom. Want to make a nutrition table/label
    //nutritionLabel.text

    return recipeResults;
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

 		$('.result-count').html('Your search of ' + recipeSearch + ' returned '+ data.count + ' results');
 		$.each(data.hits,function(i, item){
 			var recipe = showRecipe(item);
 			$('.results').append(recipe);
 		}); 
 	})
};


