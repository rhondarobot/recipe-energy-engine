$(function(){
	//prevent page from reloading on 'submit'
	$('#house-search').submit(function(e){
		e.preventDefault();	
	var houseSearch = $('house-search').val();
	findHouse('houseSearch');
	});
});

function findHouse(houseSearch) {
	var params = {
		citystatezip: houseSearch,
		key: 'X1-ZWz19kmj7cegwb_1acr8',
	};

$.ajax({
		url: 'https://www.zillow.com/webservice/GetDeepSearchResults.htm',
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
//switch from xml to json
var xml = 'https://www.zillow.com/webservice/GetDeepSearchResults.htm',
$xmlDoc = $.parseXML(xml)
$xml = $(xmldoc),
$citystatezip = $xml.find("citystatezip");	


};//end of code
