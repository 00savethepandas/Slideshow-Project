// JavaScript Document
	
//	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne", function(data){
//  $.each(data.items, function(i,item){
//    $("<img/>").attr("src", item.media.m).appendTo("#images")
//      .wrap("<a href='" + item.link + "'></a>");
	
	$(document).ready(function () {
		
		//jCarousel Plugin
	    $('#carousel').jcarousel({
			vertical: true,
			scroll: 1,
			auto: 2,
			wrap: 'last',
			initCallback: mycarousel_initCallback
	   	});

	//Front page Carousel - Initial Setup
   	$('div#carousel-div a img').css({'opacity': '0.5'});
   	$('div#carousel-div a img:first').css({'opacity': '1.0'});
   	$('div#carousel-div li a:first').append('<span class="arrow"></span>')

  
  	//Combine jCarousel with Image Display
    $('div#carousel-div li a').hover(
       	function () {
        		
       		if (!$(this).has('span').length) {
        		$('div#carousel-div li a img').stop(true, true).css({'opacity': '0.5'});
   	    		$(this).stop(true, true).children('img').css({'opacity': '1.0'});
       		}		
       	},
       	function () {
        		
       		$('div#carousel-div li a img').stop(true, true).css({'opacity': '0.5'});
       		$('div#carousel-div li a').each(function () {

       			if ($(this).has('span').length) $(this).children('img').css({'opacity': '1.0'});

       		});
        		
       	}
	).click(function () {

	      	$('span.arrow').remove();        
		$(this).append('<span class="arrow"></span>');
       	$('div#main-picture li').removeClass('active');        
       	$('div#main-picture li.' + $(this).attr('rel')).addClass('active');	
        	
       	return false;
	});


});


//Carousel Tweaking

function mycarousel_initCallback(carousel) {
	
	// Pause autoscrolling if the user moves with the cursor over the clip.
	carousel.clip.hover(function() {
		carousel.stopAuto();
	}, function() {
		carousel.startAuto();
	});
}


// FLICKER API EXAMPLE
			$(function(){
                jQuery('#a-link').remove();
                    
                var apiKey = 'ee78f78cac9824c29b1837f737726a3b';
                
				$.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=72157614923533508&format=json&jsoncallback=?',
				
                function(data){                    
                    //loop through the results with the following function
                    $.each(data.photoset.photo, function(i,item){
                        //build the url of the photo in order to link to it
                        var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
                        //turn the photo id into a variable
                        
						/*
						 var photoID = item.id;
                            //use another ajax request to get the geo location data for the image
                         $.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photos.geo.getLocation&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&jsoncallback=?',
                        function(data){
                            //if the image has a location, build an html snippet containing the data
                            if(data.stat != 'fail') {
                                pLocation = '<a target="_blank" href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&fLon=' + data.photo.location.longitude + '&zl=1">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
                                }
                            });                           
                            //use another ajax request to get the tags of the image
                            $.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&jsoncallback=?',
                            function(data){                               
                                //if the image has tags
                                if(data.photo.tags.tag != '') {                                    
                                    //create an empty array to contain all the tags
                                    var tagsArr = new Array();                                    
                                    //for each tag, run this function
                                   $.each(data.photo.tags.tag, function(j, item){                                    
                                        //push each tag into the empty 'tagsArr' created above
                                       tagsArr.push('<a href="http://www.flickr.com/photos/tags/' + item._content + '">' + item.raw + '</a>');                                        
                                    //});                                    
                                    //turn the tags array into a string variable
                                    var tags = tagsArr.join(', ');
                                }
                             // Create an imgCont string variable which will hold all the link location, title, author link, and author name into a text string
                            var imgCont = '<div class="image-container" style="background: url(' + photoURL + ');"><div class="image-info"><p class="top"><a class="title" href="http://www.flickr.com/photos/' + data.photo.owner.nsid + '/' + photoID + '">' + data.photo.title._content + '</a> <span class="author">by <a href="http://flickr.com/photos/' + data.photo.owner.nsid + '">' + data.photo.owner.username + '</a></span></p><div class="bottom"><p><span class="infoTitle">Comments:</span> ' + data.photo.comments._content + '</p>';
                            
                            //if there are tags associated with the image
                            if (typeof(tags) != 'undefined') {
                            
                                //combine the tags with an html snippet and add them to the end of the 'imgCont' variable
                                imgCont += '<p><span class="infoTitle">Tags:</span> ' + tags + '</p>';
                            }
                            
                            //if the image has geo location information associate with it
                            if(typeof(pLocation) != 'undefined'){
                            
                                //combine the geo location data into an html snippet and at that to the end fo the 'imgCont' variable
                                imgCont += '<p><span class="infoTitle">Location:</span> ' + pLocation + '</p>';
                            }
                            
                            //add the description & html snippet to the end of the 'imgCont' variable
                            imgCont += '<p><span class="infoTitle">Decription:</span> ' + data.photo.description._content + '</p></div></div>';
                            
                            //append the 'imgCont' variable to the document
                            $(imgCont).appendTo('#image-container');
                            
                            //delete the pLocation global variable so that it does not repeat
                            delete pLocation;
                        });
                        
                  });
                });
*/
                //assign hover actions to each image
                $('.image-container').live('mouseover', function(){
                    $(this).children('div').attr('class', 'image-info-active');
                });
                $('.image-container').live('mouseout', function(){
                    $(this).children('div').attr('class', 'image-info');
                });
                
  //              jQuery('#loader').remove();
                
			});