const apiKey = "de81cbd7917a62a289c2cd964e2ccb23";
const weatherResults = document.querySelector('#weatherResults');

function getWeather(cityName) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        
        var apiUrlAll =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&units=imperial&appid=" +
        apiKey;
      fetch(apiUrlAll).then(function (response) {
        response.json().then(function (data) {
          // display data
          console.log(data)
          displayWeather(data);
        });
      });
    });
    } else {
      M.toast({html: 'Please enter a valid city'});
    }
  });
}

function displayWeather(data) {
  for (let i = 0; i < 5; i++) {
    var date = new Date(data.daily[i].dt * 1000);
    var month = date.getMonth() +1;
    var day = date.getDate();
    var year = date.getFullYear();
    var fullDate = month + '/' + day + '/' + year;

    var displayForecast = document.createElement('div');
    displayForecast.classList = 'col s2 weather-item';
    displayForecast.textContent = month + '/' + day + '/' + year;

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
