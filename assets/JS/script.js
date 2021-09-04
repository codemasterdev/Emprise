const weatherResults = document.querySelector('#weatherResults');
var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

function getWeather(cityName) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data);
      })
    } else {
      M.toast({html: 'Please enter a valid city'});
    }
  });
}

function displayWeather(data) {
  for (let i = 0; i < 5; i++) {
    var date = new Date(data.list[i].dt * 1000);
    var month = date.getMonth() +1;
    var day = date.getDate();
    var year = date.getFullYear();
    var fullDate = month + '/' + day + '/' + year;

    var displayForecast = document.createElement('div');
    displayForecast.classList = 'col s2 weather-item';
    displayForecast.textContent = fullDate;

    // append el
    weatherResults.appendChild(displayForecast);
  }
}

function searchLoc() {
  var toLoc = $("#toLoc").val().trim();
  var cityName = toLoc.split(' ').join('%20');
  if (cityName) {
    getWeather(cityName)
  } else {
    M.toast({html: 'Please enter a city'});
  }
}

$("#searchBtn").click(function() {
  searchLoc();
});
