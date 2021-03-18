// _________PETFINDER SCRIPT STARTS HERE___________

let apiKey = "mPLuBul6G12XM99wSZsV1LJj4B1RnvgKYo7qZThtAvoM6uNqun"; // put your key here
let secret = "uMuiXKqNHfLNcLsmyuEhA0P26uZrjhS5yzZpIH9Y"; // put your secret here
let token;
let testURL = "https://api.petfinder.com/v2/animals";

// form element variable
var buddyFormEl = document.querySelector("#buddy-form");
// SUBMIT EVENT
buddyFormEl.addEventListener('submit', formSubmitHandler);
// input element variable
var inputEl = document.querySelector("#zipcode");
// card container div element variable
var cardContainerEl = document.querySelector("#previously-viewed");

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
                // function call #2: Calls to get data from local storage ********** 
                getStoredOrgs();
            }
        });
}

// GETTING DATA FROM LOCAL STORAGE

function getStoredOrgs() {
    for (var j = 0; j < localStorage.length; j++) {
        var key = localStorage.key(j);
        console.log(key);
        var storedOrg = JSON.parse(window.localStorage.getItem(key));
        console.log(storedOrg);

        var orgPrevViewed = document.querySelector("#previously-viewed");
        var storedBtn = document.createElement("button");

        storedBtn.classList.add("inset-y-0", "right-0", "flex", "items-center", "px-4", "text-white", "bg-blue-300");

        storedBtn.textContent = storedOrg.name + " - " + storedOrg.city;
        orgPrevViewed.appendChild(storedBtn);

        storedBtn.setAttribute("postcode", storedOrg.postcode);

        storedBtn.addEventListener("click", function (event) {

            // cardContainerEl.innerHTML = "";
            // activeCityNameEl.textContent = "";
            // activeCityIconEl.textContent = "";
            // activeCityNameEl.textContent = this.textContent;

            var postcode = event.target.getAttribute("postcode");

            // searchMap(postcode); Will call get-map-API code.
        });
    }
}

// SUBMIT ZIPCODE

function formSubmitHandler(event) {
    event.preventDefault();

    if (token) {
        var zipcodeEntered = inputEl.value.trim();
        console.log(zipcodeEntered);

        if (zipcodeEntered) {
            // function call #3: Calls to search petfinder with the input **********
            searchPetfinder(zipcodeEntered);
            
            inputEl.value = "";
            //  To be checked:  ex: activeCityNameEl.textContent = ""; - ANY FIELD TO BE EMPTIED HERE!
            //  To be done: USE MODALS INSTEAD OF ALERTS

        } else {
            alert("Please enter a zipcode");
        }

    } else {
        alert(`We don't have a token`);
    }
};

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN
// uses fetchToPetFinder... when making fetch calls to pet finder api, you have to use function fetchToPetFinder!

function searchPetfinder(zipcode) {
    var petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations";

    if (zipcode) {
        petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations/?location=" + zipcode + "&distance=10&limit=5";
    }
    console.log(petfinderOrganizationUrl);

    // function call #4: Calls to initiate fetchToPetFinder function to fetch data with token**********
    fetchToPetFinder(petfinderOrganizationUrl, function (petfinderResult) {
        console.log(petfinderResult);

        if (petfinderResult.organizations.length===0) {
            alert("No results found!");
        } else {
            for (var i = 0; i < petfinderResult.organizations.length; i++) {
                // function call #5: Calls to print the results **********
                printPetfinderResults(petfinderResult.organizations[i]);
            }
        }
    });
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
    // new button container div element variable
    var orgList = document.querySelector("#result-log");
    var resultBtn = document.createElement("button");

    resultBtn.classList.add("inset-y-0", "right-0", "flex", "items-center", "px-4", "text-white", "bg-blue-300");
    // resultBtn.value = resultOrg.name;
    resultBtn.textContent = resultOrg.name + " - " + resultOrg.address.city;
    orgList.appendChild(resultBtn);

    // this attribute "postcode" is to be used for Map API
    resultBtn.setAttribute("postcode", resultOrg.address.postcode);

    resultBtn.addEventListener("click", function (event) {

        // cardContainerEl.innerHTML = "";
        // activeCityNameEl.textContent = "";
        // activeCityIconEl.textContent = "";
        // activeCityNameEl.textContent = resultObj.name + " - " + resultObj.state;

        var postcode = event.target.getAttribute("postcode");

        // searchMap(postcode); Will call get-map-API code.
        window.localStorage.setItem(resultOrg.name, JSON.stringify({
            name: resultOrg.name,
            city: resultOrg.address.city,
            postcode: resultOrg.address.postcode,
        }));
    });

}

// THIS STARTS EVERYTHING!
// function call #1 : to get the token from petfinder **********
getToken();

// example
let queryURL = "https://api.petfinder.com/v2/organizations/?location=27516&distance=10&limit=5";
