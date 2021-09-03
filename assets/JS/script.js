var apiKey = "de81cbd7917a62a289c2cd964e2ccb23";

function displayWeather() {
  var toLoc = $("#toLoc").val().trim();
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    toLoc +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data)
      })
    }
  });
}

$("#searchBtn").click(function (event) {
  event.preventDefault();
  displayWeather();
});
