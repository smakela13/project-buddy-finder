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
        var storedBtn = document.createElement("div");
        
        prevViewedHeader.textContent = "Previously Viewed Shelters";
       
        storedBtn.classList.add("card-panel", "card-index", "waves-effect", "waves-light", "deep-orange", "lighten-2", "center-align", "text-white");
        var prevLink = storedOrg.website;
        if (storedOrg.website) {
            prevLink = storedOrg.website;
        } else {
            prevLink = storedOrg.url;
            console.log(prevLink);
        }
        var orgWebsiteLinkEl = document.createElement("a");
        orgWebsiteLinkEl.innerHTML = storedOrg.name + "<br />" + storedOrg.city + ", " + storedOrg.state;
        orgWebsiteLinkEl.setAttribute("href", prevLink);
        orgWebsiteLinkEl.setAttribute("target","_blank");

        storedBtn.appendChild(orgWebsiteLinkEl);


        storedBtn.setAttribute("postcode", storedOrg.postcode);
        orgPrevViewed.appendChild(storedBtn);

        // RESETING THE LOCAL STORAGE
        var resetBtn = document.querySelector("#reset");
        resetBtn.addEventListener("click", function(event){
        event.preventDefault();  
        window.localStorage.clear();
        document.location.reload();
        });
        
        // var orgWebsiteEl = document.querySelector("#orgWebsite");
        // orgWebsiteEl.innerHTML = "";
    }
}

getStoredOrgs();

// SUBMIT ZIPCODE

function formSubmitHandler(event) {
    event.preventDefault();
    
    var zipcodeEntered = inputEl.value.trim();
    console.log(zipcodeEntered);
    
        // ZIPCODE TEST

    function validateZipCode(elementValue){
        var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
         return zipCodePattern.test(elementValue);
    }
    var validZipTest = validateZipCode(zipcodeEntered);

    if (validZipTest) {
                
        // THIS CODE WILL TAKE US TO THE RESULTS PAGE
        var queryString = "./search-results.html?q=" + zipcodeEntered;
        location.assign(queryString);

        inputEl.value = "";
       
    } else {
        // MODAL;
        var modalalert = document.getElementById("modal1");
        M.Modal.init(modalalert);
        var instance = M.Modal.getInstance(modalalert);   
        instance.open();
    }
}

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN WILL HAPPEN ON THE SECOND PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



