// for calender pop up 
$(document).ready(function () {
    $('.datepicker').datepicker();
});


function skyscannerCity(cityCode) {

    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + cityCode, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980"
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log(data.Places[0].PlaceId);
            return (data.Places[0].PlaceId);

        })


        .catch(err => {
            console.error(err);
        });

}



function skyscannerAPI(from, to, date) {
    let date1 = moment(date).format("YYYY-MM-DD");
    let dateFormat = moment(date).format('MMM DD, YYYY');

    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "/" + to + "/" + date1, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980"
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log(data.Body.Quotes);

            if (data.Body.Quotes.length === 0) {
                var row2 = `
            <tr>
            <td>${"No Flights Available From " + from + " To " + to}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            `
                $(".flight").append(row2);
            } else {
                for (i = 0; i < response.Carriers.length; i++) {
                    if (response.Quotes[0].OutboundLeg.CarrierIds[0] == response.Carriers[i].CarrierId) {
                        var row2 = `
                <tr>
                <td>${from}</td>
                <td>${to}</td>
                <td>${response.Carriers[i].Name}</td>
                <td>${dateFormat}</td>
                <td>${"$" + response.Quotes[0].MinPrice}</td>
                </tr>
                `
                        $(".flight").append(row2); //appends flight available to the table.

                    }

                }
            }
        }).then(function () {
            $("#flight-table").trigger("update"); // sort table by flight departure date
        }).catch(err => {
            console.error(err);
        })
}

$(document).ready(function () {

    $("#submit").on("click", function () {
        var destination = $("#destination-input").val().trim();
        var origin = $("#origin-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        $(".flight").empty();

        let start = skyscannerCity(origin);
        console.log(start);

        let end = skyscannerCity(destination);
        console.log(end);

        skyscannerAPI(start, end, startDate); //calling flight API for orgin to destination flight.
        skyscannerAPI(end, start, endDate); //calling flight API for return flight from destination to origin.
    });

});