$(document).ready(function() {
  var candies = [
    "snickers", "skittles", "m&ms", "twix", "sour patch", "twizzlers",
    "reese's", "baby ruth", "heath", "kit kat", "pop rocks",
    "laffy taffy", "milkyway", "milk duds", "tootsie rolls", "almond joy",
    "thin mints"
  ];
 
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }
  $(document).on("click", ".candy-buttons", function() {
    $("#candies").empty();
    $(".candy-buttons").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var candyDiv = $("<div class=\"candy-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var candyImage = $("<img>");
        candyImage.attr("src", still);
        candyImage.attr("data-still", still);
        candyImage.attr("data-animate", animated);
        candyImage.attr("data-state", "still");
        candyImage.addClass("candy-image");
        candyDiv.append(p);
        candyDiv.append(candyImage);
        $("#candies").append(candyDiv);
      }
    });
  });
  $(document).on("click", ".candy-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-candy"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $("#add-candy").on("click", function(event) {
    event.preventDefault();
    var newCandy = $("input").eq(0).val();
    if (newCandy.length > 2) {
      candies.push(newCandy);
    }
    populateButtons(candy, "candy-button", "#candy-buttons");
  });
  populateButtons(candy, "candy-button", "#candy-buttons");
});