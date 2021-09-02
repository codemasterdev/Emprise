//flight api to input location and date to browse results
// fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-GB/?query=Stockholm", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//             "x-rapidapi-key": "1bde5c88fbmshc3edab4f94f2feep1ada8ejsn18b27f31e980"
//         }
//     })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(err => {
//         console.error(err);
//     });
// // API to convert location to Airport for 

function skyscannerAPI(from, to, date) {
    let date1 = moment(date).format("YYYY-MM-DD");
    // let from = document.querySelector('#origin-input');
    // let to = document.querySelector('#departure-input');
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
        })
    


    .catch(err => {
        console.error(err);
    })
}

$(document).ready(function () {
  $("#start-date").datepicker({format: 'm-d-yyyy'});
  $("#end-date").datepicker({format: 'm-d-yyyy'});

    $("#submit").on("click", function () {
        var origin = $("#origin-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        $(".flight").empty();
        
        skyscannerAPI(cityToAirport[origin], cityToAirport[destination], startDate); //calling flight API for orgin to destination flight.
        skyscannerAPI(cityToAirport[destination], cityToAirport[origin], endDate); //calling flight API for return flight from destination to origin.
    });

});


const cityToAirport = {
    "Birmingham": "BHM",
    "Dothan": "DHN",
    "Huntsville": "HSV",
    "Mobile": "MOB",
    "Montgomery": "MGM",
    "Anchorage": "ANC",
    "Fairbanks": "FAI",
    "Juneau": "JNU",
    "Flagstaff": "FLG",
    "Phoenix": "PHX",
    "Tucson": "TUS",
    "Yuma": "YUM",
    "Fayetteville": "FYV",
    "Little Rock": "LIT",
    "Northwest Arkansas": "XNA",
    "Burbank": "BUR",
    "Fresno": "FAT",
    "Long Beach": "LGB",
    "Los Angeles": "LAX",
    "Oakland": "OAK",
    "Ontario": "ONT",
    "Palm Springs": "PSP",
    "Sacramento": "SMF",
    "San Diego": "SAN",
    "San Francisco": "SFO",
    "San Jose": "SJC",
    "Santa Ana": "SNA",
    "Aspen": "ASE",
    "Colorado Springs": "COS",
    "Denver": "DEN",
    "Grand Junction": "GJT",
    "Pueblo": "PUB",
    "Hartford": "BDL",
    "Tweed New Haven": "HVN",
    "Washington": "IAD",
    "Daytona Beach": "DAB",
    "Fort Lauderdale-Hollywood": "FLL",
    "Fort Meyers": "RSW",
    "Jacksonville": "JAX",
    "Key West": "EYW",
    "Miami": "MIA",
    "Orlando": "MCO",
    "Pensacola": "PNS",
    "St. Petersburg": "PIE",
    "Sarasota": "SRQ",
    "Tampa": "TPA",
    "West Palm Beach": "PBI",
    "Panama City": "PFN",
    "Atlanta": "ATL",
    "Augusta": "AGS",
    "Savannah": "SAV",
    "Hilo": "ITO",
    "Honolulu": "HNL",
    "Kahului": "OGG",
    "Kailua": "KOA",
    "Lihue": "LIH",
    "Boise": "BOI",
    "Chicago": "ORD",
    "Moline": "MLI",
    "Peoria": "PIA",
    "Evansville": "EVV",
    "Fort Wayne": "FWA",
    "Indianapolis": "IND",
    "South Bend": "SBN",
    "Cedar Rapids": "CID",
    "Des Moines": "DSM",
    "Wichita": "ICT",
    "Lexington": "LEX",
    "Louisville": "SDF",
    "Baton Rouge": "BTR",
    "New Orleans": "MSY",
    "Shreveport": "SHV",
    "Augusta (Maine)": "AUG",
    "Bangor": "BGR",
    "Portland": "PWM",
    "Baltimore": "BWI",
    "Boston": "BOS",
    "Hyannis": "HYA",
    "Nantucket": "ACK",
    "Worcester": "ORH",
    "Battlecreek": "BTL",
    "Detroit": "DET",
    "Flint": "FNT",
    "Grand Rapids": "GRR",
    "Kalamazoo": "AZO",
    "Lansing": "LAN",
    "Saginaw": "MBS",
    "Duluth": "DLH",
    "Minneapolis": "MSP",
    "Rochester": "RST",
    "Gulfport": "GPT",
    "Jackson": "JAN",
    "Kansas City": "MCI",
    "St Louis": "STL",
    "Springfield": "SGF",
    "Billings": "BIL",
    "Lincoln": "LNK",
    "Omaha": "OMA",
    "Las Vegas": "LAS",
    "Reno-Tahoe": "RNO",
    "Manchester": "MHT",
    "Atlantic City": "ACY",
    "Newark": "EWR",
    "Trenton": "TTN",
    "Albuquerque": "ABQ",
    "Alamogordo": "ALM",
    "Albany": "ALB",
    "Buffalo": "BUF",
    "Islip": "ISP",
    "New York": "JFK",
    "Newburgh": "SWF",
    "Rochester": "ROC",
    "Syracuse": "SYR",
    "Westchester": "HPN",
    "Asheville": "AVL",
    "Charlotte": "CLT",
    "Fayetteville": "FAY",
    "Greensboro": "GSO",
    "Raleigh": "RDU",
    "Winston-Salem": "INT",
    "Bismark": "BIS",
    "Fargo": "FAR",
    "Akron": "CAK",
    "Cincinnati": "CVG",
    "Cleveland": "CLE",
    "Columbus": "CMH",
    "Dayton": "DAY",
    "Toledo": "TOL",
    "Oklahoma City": "OKC",
    "Tulsa": "TUL",
    "Eugene": "EUG",
    "Portland": "PDX",
    "Salem": "SLE",
    "Allentown": "ABE",
    "Erie": "ERI",
    "Harrisburg": "MDT",
    "Philadelphia": "PHL",
    "Pittsburgh": "PIT",
    "Scranton": "AVP",
    "Providence": "PVD",
    "Charleston": "CHS",
    "Columbia": "CAE",
    "Greenville": "GSP",
    "Myrtle Beach": "MYR",
    "Pierre": "PIR",
    "Rapid City": "RAP",
    "Sioux Falls": "FSD",
    "Bristol": "TRI",
    "Chattanooga": "CHA",
    "Knoxville": "TYS",
    "Memphis": "MEM",
    "Nashville": "BNA",
    "Amarillo": "AMA",
    "Austin Bergstrom": "AUS",
    "Corpus Christi": "CRP",
    "Dallas": "DAL",
    "El Paso": "ELP",
    "Houston": "HOU",
    "Lubbock": "LBB",
    "Midland": "MAF",
    "San Antonio": "SAT",
    "Salt Lake City": "SLC",
    "Burlington": "BTV",
    "Montpelier": "MPV",
    "Rutland": "RUT",
    "Dulles": "IAD",
    "Newport News": "PHF",
    "Norfolk": "ORF",
    "Richmond": "RIC",
    "Roanoke": "ROA",
    "Pasco": "PSC",
    "Seattle": "SEA",
    "Spokane": "GEG",
    "Charleston WV": "CRW",
    "Clarksburg": "CKB",
    "Huntington": "HTS",
    "Green Bay": "GRB",
    "Madison": "MSN",
    "Milwaukee": "MKE",
    "Casper": "CPR",
    "Cheyenne": "CYS",
    "Jackson Hole": "JAC",
}