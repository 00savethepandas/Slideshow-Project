$(document).ready(function($){
    var apiKey = 'ee78f78cac9824c29b1837f737726a3b';
    var search = 'fish';
    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=' + search + '&per_page=15&page=1&format=json&nojsoncallback=1';
	console.log("loading");
	
	$.getJSON(url,function(data){
		var images = [];
                    //loop through the results with the following function
            $.each(data.photos.photo, function(i,item){
			var imgSrc = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + ".jpg";
			var photoURL = $(document.createElement('li')).append($(document.createElement('img')).attr("src", imgSrc).attr("width", "200px"));
			images.push(imgSrc);
			// images += '<a href="' + item.link + '"target="_blank"></a>';
			});
		
		console.log(images);
		    
		setInterval(forwardImage, 4000);
		
		function currentImageKey(){
			i = jQuery.inArray($('#slideshow').attr('src'), images);
			return i;
		}
		
		function forwardImage() {
			currentImageKey();
			if (i < images.length) {
				changeImage(i + 1);
			} else {
				changeImage(0);
			} //else
		} // forward img
		
		function changeImage(i) {
			$('#slideshow').attr('src', images[i]);
			$('#holder img').load(function() {
				$('#slideshow').stop().animate({
					opacity: 1,
				}, 200)
			}) // load function
		}
	})
}); //get JSON
	
