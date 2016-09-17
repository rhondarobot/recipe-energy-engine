$(function(){
	//prevent page from reloading on 'submit'
	$('#house-search').submit(function(e){
		e.preventDefault();	
	var houseSearch = $('house-search').val();
	findHouse(houseSearch);
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
var xml = '<SearchResults:searchresults xsi:schemaLocation="http://www.zillow.com/static/xsd/SearchResults.xsd /vstatic/ae1bf8a790b67ef2e902d2bc04046f02/static/xsd/SearchResults.xsd">',
$xmlDoc = $.parseXML(xml)
$xml = $(xmlDoc),
$citystatezip = $xml.find("searchresults");	


};//end of code
