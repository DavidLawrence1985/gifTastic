var gifs = ["beer", "sailing", "nfl", "food"];
//var key = "rbUPdNYv1NwMffWeoCUDNmuZSnbRlszt";
//var search = $(this).attr("gif-data");
//var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + key + "&limit=10");

$(document).ready(function(){
   
    $(".gif-buttons").on("click", function(){ 
        
        var key = "dc6zaTOxFJmzC"; //"rbUPdNYv1NwMffWeoCUDNmuZSnbRlszt";
        var search = $(this).attr("gif-data");
        var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + key + "&limit=2");
        $.ajax({
        url:queryURL,
        method: "get"
    })
    .then(function(response) {
        var results = response.data;
        for ( var i = 0; i < results.length; i++){

            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifs").prepend(gifDiv);
        }

    });
    console.log($(this).attr("gif-data"));
    console.log(".gif-buttons");
    })

function gifButton(){   
    $("#gif-buttons").empty();
    for(var i = 0; i < gifs.length; i++) {
    var gifButton =  $("<button>"); 
    gifButton.addClass("gif-buttons");
    gifButton.attr("gif-data", gifs[i]);
    gifButton.text(gifs[i])
    $("#gif-buttons").append(gifButton);
    console.log(gifButton.attr("gif-data"))
    }
}

$("#add-gif").on("click" , function(){
    event.preventDefault();
    var newButton =  $("#gif-input").val().trim();
    gifs.push(newButton);
    console.log(gifs);
    gifButton();
})

gifButton();

})

  //.val().trim() clear whitespace
  //array with pre-set buttons for gifs
  //use .push to add items to an array 
  //for loop to iterate through the array and then
  //render buttons using $("button") then set attr .attr("name", value )
  //assign buttons to a search based on what the user typed 
  //use attr to assign to var search 
  //dynamically create a div and fill it with gifs that were searched for 
  