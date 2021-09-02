//flight api to input location and date to browse results
fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-GB/?query=Stockholm", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
// API to convert location to Airport for 

function skyscannerAPI(from, to, date) {
    let date1 = moment(date).format("YYYY-MM-DD");
    let dateFormat = moment(date).format('MMM DD, YYYY');

    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "-sky/" + to + "-sky/" + date1, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980"
            }
        })
        .then(response => {
            console.log(response);
            if (response.Quotes.length === 0) {
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
                $(".loadingBar1").hide();
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
                        $(".loadingBar1").hide(); //hides the loading bar after search complete

                    }

                }
            }
        }).then(function () {
            $("#flight-table").trigger("update"); // sort table by flight departure date
        });


    // .catch(err => {
    //     console.error(err);
    // });
}