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

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN WILL HAPPEN ON THE SECOND PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// THIS STARTS EVERYTHING!
// function call #1 : to get the token from petfinder **********
getToken();

// example
// let queryURL = "https://api.petfinder.com/v2/organizations/?location=27516&distance=10&limit=5";
