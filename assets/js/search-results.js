// _______SECOND PAGE PETFINDER SCRIPT STARTS HERE_______
// API variables
let apiKey = "mPLuBul6G12XM99wSZsV1LJj4B1RnvgKYo7qZThtAvoM6uNqun"; // put your key here
let secret = "uMuiXKqNHfLNcLsmyuEhA0P26uZrjhS5yzZpIH9Y"; // put your secret here
let token;

// ERROR CHECKING
function fetchErrorCheck(response) {
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        var modalalert = document.getElementById("modal1");
        M.Modal.init(modalalert);
        var instance = M.Modal.getInstance(modalalert);
        instance.open();
        throw Error(response.statusText);
    }
}

// GETTING TOKEN FROM PETFINDER
// This function gets the token from Petfinder. It must start FIRST.
function getToken() {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(fetchErrorCheck)
        .then((data) => {
            if (data.access_token) {
                token = data.access_token;
                // function call #2: Calls to get zipcode from URL 
                getParZipCode();
            }
        }).catch((error) => {
            // NECESSARY CONSOLE LOG
            console.log("Something went wrong with Petfinder API call");
            console.log(error);
        });
}

// GETTING THE ZIP CODE FROM THE URL
function getParZipCode() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var parZipCode = document.location.search.split('=').pop();
    searchPetfinder(parZipCode);
  }

// SEARCHING PETFINDER WITH ZIP CODE AND TOKEN
// Uses fetchToPetfinder when making fetch calls to Petfinder api, you have to use function fetchToPetfinder!
function searchPetfinder(zipCode) {
    if (token) {
        var petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations";
        if (zipCode) {
            petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations/?location=" + zipCode + "&distance=10&limit=5";
        }

        // function call #4: Calls to initiate fetchToPetFinder function to fetch data with token
        fetchToPetfinder(petfinderOrganizationUrl, function (petfinderResult) {
            if (petfinderResult.organizations.length===0) {
                var modalalert = document.getElementById("modal1");
                M.Modal.init(modalalert);
                var instance = M.Modal.getInstance(modalalert);
                instance.open();
            } else {
                for (var i = 0; i < petfinderResult.organizations.length; i++) {
                    // function call #5: Calls to print the results
                    printPetfinderResults(petfinderResult.organizations[i]);
                }
            }
        });
    } else {
        var modalalert = document.getElementById("modal1");
        M.Modal.init(modalalert);
        var instance = M.Modal.getInstance(modalalert);
        instance.open();
    }    
}

// Make sure you have a token before using this. For Petfinder API calls
function fetchToPetfinder(url, callback) {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(fetchErrorCheck)
        .then((data) => {
            // Logic here should handle any Petfinder API calls
            callback(data);
        }).catch((error) => {
            // NECESSARY CONSOLE LOG
            console.log("Something went wrong with Petfinder API call");
            console.log(error);
        });
}

// PRINTING THE RESULTS FROM PETFINDER
function printPetfinderResults(resultOrg) {
    var orgList = document.querySelector("#result-content");
    var resultBtn = document.createElement("a");

    resultBtn.classList.add("collection-item");
    resultBtn.textContent = resultOrg.name + " - " + resultOrg.address.city + ", " + resultOrg.address.state;
    orgList.appendChild(resultBtn);

    // Attribute "postcode" is used for Map API
    resultBtn.setAttribute("postcode", resultOrg.address.postcode);

    resultBtn.addEventListener("click", function (event) {
        var postcode = event.target.getAttribute("postcode");
        // Calls map code
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
        orgWebsiteEl.innerHTML = "<a href='" + refLink + "'>" + "Visit " + resultOrg.name + " Online" + "</a target='" + "blank" + "'>";
        orgNameEl.textContent = "Name: " + resultOrg.name;
        orgCityEl.textContent = "Location: " + resultOrg.address.city + ", " + resultOrg.address.state;
        orgEmailEl.innerHTML = "<a href='" + "mailto:" + resultOrg.email + "'>" + resultOrg.email;

        // STORING THE PICKED SHELTER
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
    var mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + postcode + ".json?country=us&access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg";

    fetch(mapUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            result = data;
            // Adds a marker on the center
            var marker = L.marker([data.features[0].center[1], data.features[0].center[0]]).addTo(map);
            marker.bindPopup("<b>Hey Buddy Finder!</b><br>Your Shelter Location").openPopup();
            // Adds a circle
            var circle = L.circle([data.features[0].center[1], data.features[0].center[0]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.1,
                radius: 200
            }).addTo(map);
        });
}

// Show map with no info
var map = L.map("mapid").setView([35.87, -78.79], 10);
// Adds a tile layer to map
L.tileLayer('https://api.mapbox.com/styles/v1/{mapId}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
        maxZoom: 18,
        mapId: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg'
    }).addTo(map);

var popup = L.popup();

// Tells user the coordinates they clicked on
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

// Closes the modal
var closeModal = document.getElementById("x");
closeModal.addEventListener("click", function () {
    location.reload();
});

// THIS STARTS EVERYTHING!
// function call #1: gets the token from PetFinder
getToken();