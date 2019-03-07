$(document).ready(function(){
    //global vars
    var topics = [ "Sailboat", "Ocean", "Beer", "BBQ", "Football", "Dogs", "Music", "Stand-Up", "Guitar", "Nature"];
    var image;
    var imageURL;
    //var downloadButton;
    //var downloadFileName;
    var favorite;
    var imageURLStill;
    var results;
    var key;
    var queryURL;
    
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

    /*function downloadGif(){
            downloadFileName.download({
            url : imageURL,
            filename : downloadFileName,
            conflictAction : "prompt"
        });
    }*/

    $("#add-gif").on("click", function() {
        event.preventDefault();
        var newButton =  $("#gif-input").val().trim();
        topics.push(newButton);
        gifButton();    
    })

    function gifSearch() {    
        var search = $(this).attr("gif-data");
        key = "rbUPdNYv1NwMffWeoCUDNmuZSnbRlszt";
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + search + "&limit=10";
    
        $.ajax({
        url: queryURL,
        method: "GET"
        
        }).then(function(response) {
                console.log(response.data);
                
                results = response.data;
                
                for ( var i = 0; i < results.length; i++) { 
                    //local vars
                    var gifDiv = $("<div>");
                    var innerDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rated: " + rating);
                    image = $("<img>");
                    //downloadButton = $("<p>").text("Download");
                    favorite = $("<p>").text("Favorite");
                    //downloadFileName = results[i].images.fixed_height.mp4;
                    imageURL = results[i].images.fixed_height.url;
                    imageURLStill = results[i].images.fixed_height_still.url;

                    //add class
                    //downloadButton.addClass("download-button my-buttons");
                    favorite.addClass("favorite-button my-buttons");
                    gifDiv.addClass("each-gif");
                    innerDiv.addClass("image-options");
                    image.addClass("myGif");
                    p.addClass("rating");

                    //add attr
                    //downloadButton.attr("file", downloadFileName);
                    image.attr("src", imageURL );
                    image.attr("data-still", imageURLStill);
                    image.attr("data-animate", imageURL);
                
                    //prepend items to #gifs div
                    gifDiv.prepend(innerDiv);
                    innerDiv.prepend(p)
                    innerDiv.prepend(favorite)
                    //innerDiv.prepend(downloadButton);
                    ;
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
        
        
       $(".favorite-button").on("click", function(){
           $(this).hide();//takes 2 clicks to work function
            var favImg = $(this).parent().parent();
            favImg.clone().prependTo("#your-fav");//doubles up on second time add fav from same gif search
            
      });
     
    }
    

    //$(document).on("click", ".download-button", downloadGif); 

    $(document).on("click", ".myGif", pauseGif);

    $(document).on("click", ".gif-search", gifSearch);

    $(document).on("click", ".favorite-button", addFav)
    
    gifButton();
    

})



