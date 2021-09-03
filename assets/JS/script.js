var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

function displayWeather(cityName) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data)
      })
    } else {
      M.toast({html: 'Please enter a valid city'});
    }
  });
}

function searchLoc() {
  var toLoc = $("#toLoc").val().trim();
  var cityName = toLoc.split(' ').join('%20');
  if (cityName) {
    displayWeather(cityName)
  } else {
    M.toast({html: 'Please enter a city'});
  }
}

$("#searchBtn").click(function() {
  searchLoc();
});
