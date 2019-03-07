$(document).ready(function(){
    var topics = ["Beer", "Sailboat", "Ocean", "BBQ", "Football", "Dogs", "Music", "Stand-Up", "Guitar", "Nature"];
    var image;
    var imageURL;
    var downloadButton;
    var downloadFileName;
    var favorite;
    var imageURLStill;
    
    function gifButton(){   
        $("#gif-buttons").empty();
        for(var i = 0; i < topics.length; i++) {
            var gifButton =  $("<p>"); 
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
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + search + "&limit=10";
    
        $.ajax({
        url: queryURL,
        method: "GET"
        
        }).then(function(response) {
                console.log(response.data);
                var results = response.data;
                
                for ( var i = 0; i < results.length; i++) { 

                    var gifDiv = $("<div>");
                    gifDiv.addClass("each-gif");
                    var innerDiv = $("<div>");
                    innerDiv.addClass("image-options");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    p.addClass("rating");
                    downloadFileName = results[i].images.fixed_height.mp4;
                    downloadButton = $("<p>").text("Download");
                    downloadButton.attr("file", downloadFileName);
                    downloadButton.addClass("download-button my-buttons");
                    favorite = $("<p>").text("Favorite");
                    favorite.addClass("favorite-button my-buttons");
                    image = $("<img>");
                    imageURL = results[i].images.fixed_height.url;
                    imageURLStill = results[i].images.fixed_height_still.url;
                    image.attr("src", imageURL );
                    image.attr("data-still", imageURLStill);
                    image.attr("data-animate", imageURL);
                    image.addClass("myGif");
                    gifDiv.prepend(innerDiv);
                    innerDiv.prepend(favorite)
                    innerDiv.prepend(downloadButton);
                    innerDiv.prepend(p);
                    gifDiv.prepend(image);
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
    }

    function addFav(){
       $(this).on("click", function(){
            var favImage = $(this);
            favImage = $("<img>");
            var favImageURL = $(this).results.images.fixed_height.url;
            var favImageURLStill = $(this).results.fixed_height_still.url;
            favImage.attr("src" , favImageURL);
            favImage.attr("data-still", favImageURLStill);
            favImage.attr("data-animate", favImageURL);
            $("#your-fav").prepend(favImage)
            //need to add results = response.data into this fucntion to access the results
            
        })
    } 

    $(document).on("click", ".download-button", downloadGif);

    $(document).on("click", ".myGif", pauseGif);

    $(document).on("click", ".gif-search", gifSearch);

    $(document).on("click", ".favorite-button", addFav)
    
    gifButton();

})



//create a favorite button for each gif that is loaded 
//button will prepend to favoite section
//download with link?
/* var input = $("#add-gif");
  input.keyup(function() {
  if (event.keyCode === 13) {
   event.preventDefault();
   $("#add-gif").click();
  }
}); */