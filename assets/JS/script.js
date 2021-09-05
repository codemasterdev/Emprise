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
        // convert name to coords
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
    })
    .catch(err => {
      console.log(err);
    });
    } else {
      M.toast({html: 'Please enter a valid city'});
    }
  });
}

function displayWeather(data) {
  // clear results
  $('#weatherResults').empty();
  for (let i = 0; i < 5; i++) {
    var date = new Date(data.daily[i].dt * 1000);
    var month = date.getMonth() +1;
    var day = date.getDate();
    var year = date.getFullYear();
    var fullDate = month + '/' + day + '/' + year;

    var displayForecast = document.createElement('div');
    var displayIcon = document.createElement('img');
    var displayTemp = document.createElement('h6');
    var displayWind = document.createElement('h6');
    var displayHum = document.createElement('h6');
    displayForecast.classList = 'col s2 weather-item';
    displayForecast.textContent = fullDate;
    displayIcon.src = 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png';
    displayIcon.alt = data.daily[i].weather[0].main;
    displayTemp.textContent = 'Temp: ' + data.daily[i].temp.max + '°F';
    displayWind.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH'
    displayHum.textContent = 'Humidity: ' + data.daily[i].humidity + '%'
    
    // append elements
    weatherResults.appendChild(displayForecast);
    displayForecast.appendChild(displayIcon);
    displayForecast.appendChild(displayTemp);
    displayForecast.appendChild(displayWind);
    displayForecast.appendChild(displayHum);
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
