// Starting Gif options array
var characters = ["Basketball", "Baseball", "Football", "Swimming", "Hockey", "Lacrosse", "Golf", "Soccer", "Tennis"];

// API Call
function displaySportsGifs() {
  var gifSearch = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  //AJAX Call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var results = response.data;

    for (var i = results.length-1; i >= 0; i--) {
      //Looping through results and creates card for each
      var gifCard = $('<div class="col-lg-3 col-sm-5 card">');
      
      //create place for gifimage
      var gifImg = $('<img class="card-img-top img-fluid">');

      //Set source attr
      gifImg.attr("imgGIF", results[i].images.fixed_width.url);
      gifImg.attr("imgStill", results[i].images.fixed_width_still.url);
      gifImg.attr("src", gifImg.attr("imgStill"));


      //create new gifCardBody for area
      var gifCardBody = $('<div class="card-body text-center">');

      //create new gifCardTitle for the gif title
      var gifCardTitle = $('<h5 class="card-title">' + results[i].title + '</h5>');

      //create rating variable for gifs and assign them to a new div card-text
      var rating = results[i].rating;
      var gifCardText = $('<div class="card-text">').text("Rating: " + rating);

      //Appending things together
      gifCardBody.append(gifCardTitle);
      gifCardBody.append(gifCardText);
      gifCard.append(gifImg);
      gifCard.append(gifCardBody);
      $("#divGifs").prepend(gifCard);
    }
  });
}

// Function for data
function renderButtons() {

  $("#divButtons").empty();
  // Loops through the array 
  for (var i = 0; i < characters.length; i++) {

    var a = $('<button class="btn btn-primary">');
    // Provided the initial button text
    a.text(characters[i]);
    
    // Added the button to the divButtons div
    $("#divButtons").append(a);
  }
}

$("#btnAddInput").on("click", function (event) {
  event.preventDefault();
  var character = $("#sportInput").val().trim();
  characters.push(character);

  $("#sportInput").val("");
  renderButtons();
});

//changing images from still to working
function imgClick() {
  if ($(this).attr("src") == $(this).attr("imgStill")) {
    $(this).attr("src", $(this).attr("imgGIF"));
  } else {
    $(this).attr("src", $(this).attr("imgStill"));
  }
};

$(document.body).on("click", ".btn-primary", displaySportsGifs);

$(document.body).on("click", "img", imgClick);

renderButtons();