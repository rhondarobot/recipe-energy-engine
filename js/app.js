$(function(){
	//prevent page from reloading on 'submit'
	$('#house-search').submit(function(e){
		e.preventDefault();	
	var houseSearch = $('house-search').val();
	findHouse(houseSearch);
	});
});


//still need to add the different parameters for the code to append to html table




function findHouse(houseSearch) {
	var params = {
		citystatezip: houseSearch,
		key: 'X1-ZWz19kmj7cegwb_1acr8',
	};

$.ajax({
		url: 'https://www.zillow.com/webservice/GetDeepSearchResults.htm',//I believe this is the correct endpoint
		data: params,
		dataType: "jsonp",
		type: "GET",
	})	
.done(function(searchresults){
	var searchResults = showResults(params.citystatezip, searchresults.items.length);
	$('.house-results').html(searchResults);
	$.each(searchresults.items, function(i, item){//using i and 'items' as placeholders for
		var house = showHouse(item);//after xml file is parsed and I can see which variables to use
		$('.results').append(house);
	});
})
//switch from xml to json
var xml = '<citystatezip>',//keep getting an error in console. Tried different codes/pieces here
$xmlDoc = $.parseXML(xml)
$xml = $(xmlDoc),
$citystatezip = $xml.find("citystatezip");	


};//end of code
