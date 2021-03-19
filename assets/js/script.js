// _________PETFINDER SCRIPT STARTS HERE___________


// form element variable
var buddyFormEl = document.querySelector("#buddy-form");
// SUBMIT EVENT
buddyFormEl.addEventListener('submit', formSubmitHandler);
// input element variable
var inputEl = document.querySelector("#zipcode");
// card container div element variable
var cardContainerEl = document.querySelector("#previously-viewed");


// GETTING DATA FROM LOCAL STORAGE

function getStoredOrgs() {
    for (var j = 0; j < localStorage.length; j++) {
        var key = localStorage.key(j);
        console.log(key);
        var storedOrg = JSON.parse(window.localStorage.getItem(key));
        console.log(storedOrg);

        var prevViewedHeader = document.querySelector("#previously-viewed-header");
        var orgPrevViewed = document.querySelector("#previously-viewed");
        var storedBtn = document.createElement("button");

        storedBtn.classList.add("btn waves-effect waves-light deep-orange lighten-2 center-align text-white");

        prevViewedHeader.textContent = "Previously Viewed Shelters";
        storedBtn.textContent = storedOrg.name + " - " + storedOrg.city;
        orgPrevViewed.appendChild(storedBtn);

        storedBtn.setAttribute("postcode", storedOrg.postcode);

        storedBtn.addEventListener("click", function (event) {
            var postcode = event.target.getAttribute("postcode");
            // cardContainerEl.innerHTML = "";
            // activeCityNameEl.textContent = "";
            // activeCityIconEl.textContent = "";
            // activeCityNameEl.textContent = this.textContent;

           // THIS CODE WILL TAKE US TO THE VISITED SHELTERS PAGE
        //    WE NEED TO CREATE ANOTHER HTML DUE TO TOKEN GENERATOR
            var queryString = "./visited-shelters.html?q=" + postcode;
            location.assign(queryString);
            
            // searchMap(postcode); Will call get-map-API code.
        });
    }
}

getStoredOrgs();

// SUBMIT ZIPCODE

function formSubmitHandler(event) {
    event.preventDefault();
    
    var zipcodeEntered = inputEl.value.trim();
    console.log(zipcodeEntered);

    if (zipcodeEntered) {
        // function call #3: Calls to search petfinder with the input **********
        // searchPetfinder(zipcodeEntered);
            
        // THIS CODE WILL TAKE US TO THE RESULTS PAGE
        var queryString = "./search-results.html?q=" + zipcodeEntered;
        location.assign(queryString);

        inputEl.value = "";
        //  To be checked:  ex: activeCityNameEl.textContent = ""; - ANY FIELD TO BE EMPTIED HERE!
        //  To be done: USE MODALS INSTEAD OF ALERTS

    } else {
        alert("Please enter a zipcode");
    }
    
}

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN WILL HAPPEN ON THE SECOND PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



