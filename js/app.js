$(function(){
	//prevent page from reloading on 'submit'
	$('#house-search').on(submit, function(e){
		e.preventDefault();	
	var houseSearch = $('house-search').val();
	findHouse('houseSearch');
	});
});

function findAHouse(houseSearch) {
	var params = {
		citystatezip: houseSearch,
		key: X1-ZWz19kmj7cegwb_1acr8,
	};

$.ajax({
		url: 'http://www.zillow.com/webservice/GetDeepSearchResults.htm';
		data: params,
		dataType: "jsonp",
		type: "GET",
	})	
.done(function(searchresults){
	var searchResults = showResults(params.citystatezip, searchresults.items.length);
	$('.house-results').html(searchResults);
	$.each(searchresults.items, function(i, item){
		var house = showHouse(item);
		$('.results').append(house);
	});
})
	


};//end of code
