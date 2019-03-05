$(document).ready(function(){
    var topics = ["beer", "sailing", "ocean", "food"];
    var image;

function gifButton(){   
    $("#gif-buttons").empty();
    for(var i = 0; i < topics.length; i++) {
        var gifButton =  $("<button>"); 
        gifButton.addClass("gif-search");
        gifButton.attr("gif-data", topics[i]);
        gifButton.text(topics[i])
        $("#gif-buttons").append(gifButton);
        console.log(gifButton.attr("gif-data"))
        
    }
}

$("#add-gif").on("click", function() {
    event.preventDefault();
    var newButton =  $("#gif-input").val().trim();
    gifs.push(newButton);
    gifButton();    
})

function gifSearch() {    
    var search = $(this).attr("gif-data");
    var key = "rbUPdNYv1NwMffWeoCUDNmuZSnbRlszt";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + search + "&limit=3";
   
    $.ajax({
    url: queryURL,
    method: "GET"
    
    }).then(function(response) {
            console.log(response.data);
            var results = response.data;
            
            for ( var i = 0; i < results.length; i++) { 

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                image = $("<img>");
                var imageURL = results[i].images.fixed_height.url
                image.attr("src", imageURL );
                gifDiv.prepend(p);
                gifDiv.prepend(image);
                $("#gifs").prepend(gifDiv);
            }
});

}


$(document).on("click", ".gif-search", gifSearch);

gifButton();

})

//create a favorite button for each gif that is loaded 
//button will prepend to favoite section
/*
    var downloading = browser.downloads.download(
        options                   // object
        )
        var downloadUrl = "https://example.org/image.png";

var downloading = browser.downloads.download({
  url : downloadUrl,
  filename : 'my-image-again.png',
  conflictAction : 'uniquify'
});

    */