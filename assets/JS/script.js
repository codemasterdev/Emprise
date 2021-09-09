// for calender pop up
$(document).ready(function () {
  $(".datepicker").datepicker();
  $("#flight-table").tablesorter({
    sortList: [
      [3, 0]
    ]
  }); // allows the flights to be sorted by departure date.

});

//function to get user city input converted to API parameter format
function skyscannerCity(cityCode) {
  return fetch(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" +
    cityCode, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980",
      },
    });
}

function skyscannerAPI(from, to, date) {
  console.log(to);
  console.log(from);
  let date1 = moment(date).format("YYYY-MM-DD");
  let dateFormat = moment(date).format("MMM DD, YYYY");

  fetch(
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "/" + to + "/" + date1, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980",
        },
      })

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.Quotes.length === 0) {
        var row2 = `
            <tr>
            <td>${"No Flights Available From " + from + " To " + to}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            `;
        $(".flight").append(row2);
      } else {
        for (i = 0; i < data.Carriers.length; i++) {
          if (
            data.Quotes[0].OutboundLeg.CarrierIds[0] ==
            data.Carriers[i].CarrierId
          ) {
            var row2 = `
                <tr>
                <td>${from}</td>
                <td>${to}</td>
                <td>${data.Carriers[i].Name}</td>
                <td>${dateFormat}</td>
                <td>${"$" + data.Quotes[0].MinPrice}</td>
                </tr>
                `;
            $(".flight").append(row2); //appends flight available to the table.
          }
        }
      }
    })
    .then(function () {
      $("#flight-table").trigger("update"); // sort table by flight departure date
    })
    .catch((err) => {
      console.error(err);
    });
}

$(document).ready(function () {
  $("#submit").on("click", async function () {
    var destination = $("#destination-input").val().trim();
    var origin = $("#origin-input").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
    $(".flight").empty();

    let startResponse = await skyscannerCity(origin);
    console.log(startResponse);
    let data = await startResponse.json();

    console.log(data);
    let start = data.Places[0].PlaceId;
    console.log(start);
    let endResponse = await skyscannerCity(destination);
    console.log(endResponse);
    let data2 = await endResponse.json();
    let end = data2.Places[0].PlaceId;
    console.log(data2);

    await skyscannerAPI(start, end, startDate)
    //calling flight API for orgin to destination flight.
    if ($("#one-way").is(':checked')) {

    } else {
      skyscannerAPI(end, start, endDate);
    } //calling flight API for return flight from destination to origin.
  });
});


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
              displayWeather(data);
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      M.toast({
        html: 'Please enter a valid city'
      });
    }
  });
}

function displayWeather(data) {
  // clear results
  $('#weatherResults').empty();
  for (let i = 0; i < 5; i++) {
    var date = new Date(data.daily[i].dt * 1000);
    var month = date.getMonth() + 1;
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
    displayIcon.id = 'weatherIcons';
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
  var toLoc = $("#destination-input").val().trim();
  var cityName = toLoc.split(' ').join('%20');
  if (cityName) {
    getWeather(cityName)
  } else {
    M.toast({
      html: 'Please enter a city'
    });
  }
}

$("#submit").click(function () {
  searchLoc();
});
$(document).ready(function () {
  $("#swap-btn").click(function () {
    let temp = $("#origin-input").val();
    $('#origin-input').val($("#destination-input").val());
    $('#destination-input').val(temp);
  });
});

//  CODE TO SAVE USER SEARCH INPUTS

window.onload = function () {

  // If localStorage is storing default values (ex. name), exit the function and do not restore data
  if (localStorage.getItem('origin') == "origin") {
    return;
  }

  // If values are not blank, restore them to the fields
  let origin = localStorage.getItem('origin');
  if (origin !== null) $('#origin-input').val(origin);

  let destination = localStorage.getItem('destination');
  if (destination !== null) $('#destination-input').val(destination);

  let startDate = localStorage.getItem('startDate');
  if (startDate !== null) $('#start-date').val(startDate);

  let endDate = localStorage.getItem('endDate');
  if (endDate !== null) $('#end-date').val(endDate);
}

// Before refreshing the page, save the form data to localStorage
window.onbeforeunload = function () {
  localStorage.setItem("origin", $('#origin-input').val());
  localStorage.setItem("destination", $('#destination-input').val());
  localStorage.setItem("startDate", $('#start-date').val());
  localStorage.setItem("endDate", $('#end-date').val());
}




// ARRAY FOR SEARCH RESULTS
// const searchResults = {
//   flightTo: 'Honston',
//   flightFrom: 'Jamaica',
// };

// // COVERT OBJECT/ARRAY TO A STRING
// const searchResults_serialized = JSON.stringify((searchResults));


// localStorage.setItem('searchResults', JSON.stringify(searchResults_serialized));

// const searchResults_deserialized = JSON.parse(localStorage.getItem('searchResults'));

// console.log(searchResults_deserialized);

// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementsByClassName('btn_Large').addEventListener('click', searchResults);
// })