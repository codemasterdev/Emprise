// for calender pop up
$(document).ready(function () {
  $(".datepicker").datepicker();
});

//function to get user city input converted to API parameter format
function skyscannerCity(cityCode) {
  return fetch(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" +
      cityCode,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980",
      },
    }
  );
}

function skyscannerAPI(from, to, date) {
  console.log(to);
  console.log(from);
  let date1 = moment(date).format("YYYY-MM-DD");
  let dateFormat = moment(date).format("MMM DD, YYYY");

  fetch(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" +
      from +
      "/" +
      to +
      "/" +
      date1,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980",
      },
    }
  )
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

    await skyscannerAPI(start, end, startDate); //calling flight API for orgin to destination flight.
    skyscannerAPI(end, start, endDate); //calling flight API for return flight from destination to origin.
  });
});
