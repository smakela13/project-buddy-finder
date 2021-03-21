let apiKey = "mPLuBul6G12XM99wSZsV1LJj4B1RnvgKYo7qZThtAvoM6uNqun"; // put your key here
let secret = "uMuiXKqNHfLNcLsmyuEhA0P26uZrjhS5yzZpIH9Y"; // put your secret here
let token;
let testURL = "https://api.petfinder.com/v2/animals";

// GETTING TOKEN FROM PETFINDER
// This is the function to get the token from petfinder. It must start FIRST.

function getToken() {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => response.json())
        .then((data) => {
            console.log("Token response: ", data);
            if (data.access_token) {
                token = data.access_token;
                // function call #2: Calls to get zipcode from URL********** 
                getParZipcode();
            }
        });
}

// GETTING THE ZIPCODE FROM THE URL

function getParZipcode() {
    var parZipcode = document.location.search.split('=').pop();
    searchPetfinder(parZipcode);
  }

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN

function searchPetfinder(zipcode) {
    
    if (token) {
        var petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations";
        
        if (zipcode) {
            petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations/?location=" + zipcode + "&distance=10&limit=5";
        }

        // function calls to initiate fetchToPetFinder function to fetch data with token
        fetchToPetFinder(petfinderOrganizationUrl, function (petfinderResult) {
            console.log(petfinderResult);

            if (petfinderResult.organizations.length===0) {
                alert("No results found!");
            } else {
                for (var i = 0; i < petfinderResult.organizations.length; i++) {
                    // function calls to print the results
                    printPetfinderResults(petfinderResult.organizations[i]);
                }
            }
        });
    } else {
        alert(`We don't have a token`);
    }    
}

// make sure you have a token before using this, this is for pet finder api calls
function fetchToPetFinder(url, callback) {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
        .then((data) => {
            // console.log(data);
            // your logic here should handle any pet finder api calls

            // OR
            callback(data);
        });
}

// PRINTING THE RESULTS FROM PETFINDER

function printPetfinderResults(resultOrg) {
    console.log(resultOrg);
    var orgList = document.querySelector("#result-content");
    var resultBtn = document.createElement("a");

    resultBtn.classList.add("collection-item");
    resultBtn.textContent = resultOrg.name + " - " + resultOrg.address.city + ", " + resultOrg.address.state;
    orgList.appendChild(resultBtn);

    // this attribute "postcode" is to be used for Map API
    resultBtn.setAttribute("postcode", resultOrg.address.postcode);

    resultBtn.addEventListener("click", function (event) {
        var postcode = event.target.getAttribute("postcode");
        // Will call map-coding.
        printMap(postcode);
        
        // PRINTING THE WEBSITE INFO FOR THE PICKED SHELTER
        var orgWebsiteEl = document.querySelector("#orgWebsite");
        var orgNameEl = document.querySelector("#orgName");
        var orgCityEl = document.querySelector("#orgCityState");
        var orgEmailEl = document.querySelector("#orgEmail");
        var refLink = resultOrg.website;

        if (resultOrg.website) {
            refLink = resultOrg.website;
        } else {
            refLink = resultOrg.url;
        }
        
        orgWebsiteEl.innerHTML = "";
        orgNameEl.innerHTML = "";
        orgCityEl.innerHTML = "";
        orgEmailEl.innerHTML = "";
        orgWebsiteEl.innerHTML = "Website: " + "<a href='" + refLink + "'>" + "Visit " + resultOrg.name + " Online" + "</a target='" + "blank" + "'>";
        orgNameEl.textContent = "Name: " + resultOrg.name;
        orgCityEl.textContent = "Location: " + resultOrg.address.city + ", " + resultOrg.address.state;
        orgEmailEl.innerHTML = "Email: " + "<a href='" + "mailto:" + resultOrg.email + "'>" + resultOrg.email;

        // STORING THE PICKED SHELTER IN LOCAL STORAGE
        window.localStorage.setItem(resultOrg.name, JSON.stringify({
            name: resultOrg.name,
            city: resultOrg.address.city,
            state: resultOrg.address.state,
            postcode: resultOrg.address.postcode,
            website: refLink,
        }));

    });

}

// SHOWING THE MAP FOR THE PICKED SHELTER

function printMap(postcode) {
    console.log(postcode);

    var mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + postcode + ".json?country=us&access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg";

    console.log(mapUrl);

    fetch(mapUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            result = data;
            //get info from this data and plug into map
            console.log('sending this to leaflet: ', [data.features[0].center[1], data.features[0].center[0]]);
            // add a marker on the center
            var marker = L.marker([data.features[0].center[1], data.features[0].center[0]]).addTo(map);

            marker.bindPopup("<b>Hey Buddy Finder!</b><br> Here is your shelter's area").openPopup();
            // add a circle
            var circle = L.circle([data.features[0].center[1], data.features[0].center[0]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.1,
                radius: 5000,
            }).addTo(map);
        });
}

// show the map with no info
var map = L.map("mapid").setView([35.87, -78.79], 10);
// add tile layer to map
L.tileLayer('https://api.mapbox.com/styles/v1/{mapId}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
        // attribution: data.attribution,
        maxZoom: 18,
        mapId: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg'
    }).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

// console.log('about to build the map', postcode);


// THIS STARTS EVERYTHING!
// function call #1 : to get the token from petfinder **********
getToken();

// example
// let queryURL = "https://api.petfinder.com/v2/organizations/?location=27516&distance=10&limit=5";


