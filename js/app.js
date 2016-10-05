$(function(){
    //prevent page from reloading on 'submit'
    $('.ingredient-search').submit(function(e){
        e.preventDefault(); 
        //zero out previous search if results have shown
        $('.results').html('');
        var recipeSearch = $('.inputIngredient').val();
        var low = $('.lowNum').val();
        var high = $('.highNum').val();
        findRecipe(recipeSearch,low,high);  
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
    recipeLink = recipeResults.find('.info a');
    recipeLink.attr('href',item.recipe.url);

    // var recipeImage = recipeResults.find('.recipe-image');
    recipeResults.attr('style','background-image: url("'+item.recipe.image+'")');//'href',item.recipe.url

    var recipeYield = recipeResults.find('.yield');
    recipeYield.text(item.recipe.yield + ' servings');

    var recipeKCal = recipeResults.find('.calories');
    recipeKCal.text(Math.round(item.recipe.calories)  + ' Calories per Recipe');

    var servingKcals = (parseInt(item.recipe.calories)/parseInt(item.recipe.yield));
    var servingCals = recipeResults.find('.serving-calories');
    servingCals.html(Math.round(servingKcals) + ' calories per serving');

    var info = recipeResults.find('.info');
    //creating activities and calories expended to integrate into recipe search
//walking
// var walking = function(weight,time,speed){
//     var KPH3 = speed * speed * speed;
//     var KPH2 = speed * speed;
//     var KPH = speed;
//     var T = (time/60);
//     var WKG = weight;
//     return Math.floor(((0.0171 * KPH3) - (0.1062 * KPH2) + (0.6080 * KPH) + 1.8600) * WKG * T);
// };
    var enterWeight = $('.user-weight').val();
    var walkingOff = function(servingKcals,enterWeight){

    var KPH = 4;
    var KPH2 = KPH * KPH;
    var KPH3 = KPH * KPH * KPH;
    var WKG = enterWeight;
            //1.0944        -        1.6992        +     2.432         + 1.8600
            //3.6872 * 200
            //737.44
    return Math.ceil((servingKcals / (((0.0171 * KPH3) - (0.1062 * KPH2) + (0.6080 * KPH) + 1.8600) * WKG)) * 60);
};

// console.log('walking an hour would burn',':',walking(200,60,4),'calories');
// console.log('to walk off a Big Mac you need to walk ',':',walkingOff(563,200),'minutes');

    //example for sports API and what desired results will look like
        if(servingKcals >= 0 && servingKcals <=200) {
            info.css('background-color','rgba(0,0,0,0.6)').append('<p class="feedback">','You will need to walk ',walkingOff(servingKcals,enterWeight),' minutes to burn this recipe off. Not bad.','</p>');
        } 
        else if(servingKcals >201 && servingKcals <=400) {
            info.css('background-color','rgba(0,255,0,0.8)').append('<p class="feedback">','You will need to walk ',walkingOff(servingKcals,enterWeight),' minutes to burn this recipe off. You got this!','</p>');
        } 
        else if(servingKcals >401 && servingKcals <=600) {
            info.css('background-color','rgba(0,0,255,0.6)').append('<p class="feedback">','You will need to walk ',walkingOff(servingKcals,enterWeight),' minutes to burn this recipe off. Put on some good walking shoes!','</p>');
        }   
        else if(servingKcals >601 && servingKcals <=800)  {
            info.css('background-color','rgba(255,0,255,0.6)').append('<p class="feedback">','You will need to walk ',walkingOff(servingKcals,enterWeight),' minutes to burn this recipe off. Better bring some water!','</p>');
        }
        else {
            info.css('background-color','rgba(255,0,0,0.6)').append('<p class="feedback">','You will need to walk ',walkingOff(servingKcals,enterWeight),' minutes to burn this recipe off. Tie up those laces..this will be a while','</p>');
        }
        

    var ingredientCount = recipeResults.find('.ingredients-count');
    ingredientCount.text('(' + item.recipe.ingredients.length + ')');

    var recipeIngredients = recipeResults.find('.ingredients');
    recipeIngredients.text(item.recipe.ingredientLines);

    var recipeType = recipeResults.find('.diet-type');
    recipeType.text(item.recipe.dietLabels);
        //add string to 0 length arrays so item will not be blank
        if (item.recipe.dietLabels.length === 0) {
            recipeType.html('Not Applicable');
        }
    
    var recipeHealth = recipeResults.find('.health-label');
    recipeHealth.text(item.recipe.healthLabels);

    var recipeMeasurement = recipeResults.find('.measurement');
    recipeMeasurement.text(Math.round(item.recipe.totalWeight) + 'g');

    //var nutrients = recipeResults.find('.nutrients');
    //nutrients.text(item.recipe.nutrients.CA);
    //move this to the bottom or side-bottom. Want to make a nutrition table/label
    //nutritionLabel.text

    return recipeResults;
};  
   
 function findRecipe(recipeSearch,low,high) {
    var recipeParams = {
        q: recipeSearch,
        'app-key': 'X1-ZWz19kmj7cegwb_1acr8',
        'app-id': '4bdd672f',
        calories: 'gte '+ low + ',lte ' + high,
        from: 0,
        to: 16
    };

    $.ajax({
        url: 'https://api.edamam.com/search',
        data: recipeParams,
        dataType: "jsonp",
        type: "GET",
    })  
    .done(function(data){
        $('.result-count').html('Your search of ' + recipeSearch + ' returned ' + data.hits.length + ' of ' + data.count + ' results');
        $.each(data.hits,function(i, item){
            var recipe = showRecipe(item);
            $('.results').append(recipe);
            //clear out search line & results at next search
            $('.inputIngredient').val('');
        }); 
    });




}
