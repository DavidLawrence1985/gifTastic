$(document).ready(function(){
    var topics = ["beer", "sailing", "ocean", "food"];
    var image;
    var imageURL;
    var downloadButton;
    var downloadFileName;
    var favorite;

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

function downloadGif(){
        downloadFileName.download({
        url : imageURL,
        filename : downloadFileName,
        conflictAction : "prompt"
    });
}

$("#add-gif").on("click", function() {
    event.preventDefault();
    var newButton =  $("#gif-input").val().trim();
    topics.push(newButton);
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
                gifDiv.addClass("each-gif");
                var innerDiv =$("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                p.addClass("rating");
                downloadFileName = results[i].images.fixed_height.mp4;
                downloadButton = $("<button>").text("Download");
                downloadButton.attr("file", downloadFileName);
                downloadButton.addClass("download-button my-buttons");
                favorite = $("<button>").text("favorite");
                favorite.addClass("favorite-button my-buttons");
                image = $("<img>");
                imageURL = results[i].images.fixed_height.url
                var imageURLStill = results[i].images.fixed_height_still.url
                image.attr("src", imageURL );
                image.attr("data-still", imageURLStill);
                image.attr("data-animate", imageURL);
                image.addClass("myGif");
                innerDiv.prepend(favorite)
                innerDiv.prepend(downloadButton);
                innerDiv.prepend(p);
                gifDiv.prepend(image);
                gifDiv.prepend(innerDiv);
                $("#gifs").prepend(gifDiv);
            }
});

}

function pauseGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

$(document).on("click", ".download-button", downloadGif);

$(document).on("click", ".myGif", pauseGif);

$(document).on("click", ".gif-search", gifSearch);


gifButton();

})



//create a favorite button for each gif that is loaded 
//button will prepend to favoite section
//download with link?
