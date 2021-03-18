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
    
};

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN WILL HAPPEN ON THE SECOND PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



