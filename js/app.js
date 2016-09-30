$(function(){
    //prevent page from reloading on 'submit'
    $('.ingredient-search').submit(function(e){
        e.preventDefault(); 
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
    recipeLink.attr('href',item.recipe.uri);

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

    //example for sports API and what desired results will look like
        if(servingKcals >= 0 && servingKcals <=200) {
            info.css('background-color','rgba(0,0,0,0.6)').append('You will need to walk 2,500 steps to burn this food off');
        } 
        else if(servingKcals >201 && servingKcals <=400) {
            info.css('background-color','rgba(0,255,0,0.6)').append('You will need to walk 5,000 steps to burn this food off');
        } 
        else if(servingKcals >401 && servingKcals <=600) {
            info.css('background-color','rgba(0,0,255,0.6)').append('You will need to walk 10,000 steps to burn this food off');
        }   
        else if(servingKcals >601 && servingKcals <=800)  {
            info.css('background-color','rgba(255,0,255,0.6)').append('You will need to walk 15,000 steps to burn this food off');
        }
        else {
            info.css('background-color','rgba(255,0,0,0.6)').append('You will need to walk 25,000 steps to burn this food off');
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
 
// trying to set a dynamic caloric range based on user's input. **not working**
//     var showkcalRangeResults = function(item){
//     var gte = $('.lowNum');
//     var lte = $('.highNum');

//     if (item.recipe.calories >= gte && item.recipe.calories <= lte) {
//         $('.results').append(showRecipe);
//     }
//     console.log(showkcalRangeResults);
// };      


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
        console.log(data);

        $('.result-count').html('Your search of ' + recipeSearch + ' returned ' + data.hits.length + ' of ' + data.count + ' results');
        $.each(data.hits,function(i, item){
            var recipe = showRecipe(item);
            $('.results').append(recipe);
            //clear out search line
        }); 
    });

}

// tried to setup calorie search **didn't work**
// function findRecipe(recipeSearch2) {
//     var recipeParams = {
//         q: recipeSearch2,
//         'app-key': 'X1-ZWz19kmj7cegwb_1acr8',
//         'app-id': '4bdd672f',
//         calories: "lte 0,ute 5000" 
//     };

//     $.ajax({
//         url: 'https://api.edamam.com/search',
//         data: recipeParams,
//         dataType: "jsonp",
//         type: "GET",
//     })  
//     .done(function(data){
//         console.log(data);
//         $('.result-count').html('Your search of ' + recipeSearch2 + ' calories returned ' + data.count + ' results');
//         $.each(data.hits,function(i, item){
//             var recipe = showRecipe(item);
//             $('.results').append(recipe);
//         }); 
//     });
// }


//   ***Trying to change the color of hover color feature at random. Not working***
//   $('a').hover(function(e)
//     {
//         var randomColor = getRandomColor();
//         $(e.target).attr("class", randomColor);
//     });


// function getRandomColor() {
//     //Store available css classes
//     var classes = new Array("green", "purple", "teal", "violet", "pink");

//     //Get a random number from 0 to 4
//     var randomNumber = Math.floor(Math.random()*5);

//     return classes[randomNumber];
// }