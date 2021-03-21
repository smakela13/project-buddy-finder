<<<<<<< HEAD
=======
// _______PETFINDER SCRIPT STARTS HERE_______


// Form element variable
>>>>>>> a5cd3efe75f2d69c3e9eaa4f367703c4933e4ad9
var buddyFormEl = document.querySelector("#buddy-form");
buddyFormEl.addEventListener('submit', formSubmitHandler);
<<<<<<< HEAD
var inputEl = document.querySelector("#zipcode");
var cardContainerEl = document.querySelector("#previously-viewed");
=======
// Input element variable
var inputEl = document.querySelector("#zipcode");
>>>>>>> a5cd3efe75f2d69c3e9eaa4f367703c4933e4ad9

// GETTING DATA FROM LOCAL STORAGE
function getStoredOrgs() {
    for (var j = 0; j < localStorage.length; j++) {
        var key = localStorage.key(j);
        var storedOrg = JSON.parse(window.localStorage.getItem(key));

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
        }

        var orgWebsiteLinkEl = document.createElement("a");
        orgWebsiteLinkEl.innerHTML = storedOrg.name + "<br />" + storedOrg.city + ", " + storedOrg.state;
        orgWebsiteLinkEl.setAttribute("href", prevLink);
        orgWebsiteLinkEl.setAttribute("target","_blank");
        storedBtn.appendChild(orgWebsiteLinkEl);
        storedBtn.setAttribute("postcode", storedOrg.postcode);
        orgPrevViewed.appendChild(storedBtn);

        // RESETTING THE LOCAL STORAGE
        var resetBtn = document.querySelector("#reset");
        resetBtn.classList.add("visible");
        resetBtn.addEventListener("click", function(event){
            event.preventDefault();  
            window.localStorage.clear();
            document.location.reload();
        });
    }
}
getStoredOrgs();

// SUBMIT ZIP CODE
function formSubmitHandler(event) {
    event.preventDefault();
    
    var zipCodeEntered = document.querySelector("#zipcode").value.trim();
    
<<<<<<< HEAD
    // ZIPCODE TEST

=======
    // ZIP CODE TEST
>>>>>>> a5cd3efe75f2d69c3e9eaa4f367703c4933e4ad9
    function validateZipCode(elementValue){
        var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
         return zipCodePattern.test(elementValue);
    }
    var validZipTest = validateZipCode(zipCodeEntered);

    if (validZipTest) {
        // THIS CODE WILL TAKE US TO THE RESULTS PAGE
        var queryString = "./search-results.html?q=" + zipCodeEntered;
        location.assign(queryString);
        inputEl.value = "";
    } else {
        // MODAL
        var modalalert = document.getElementById("modal1");
        M.Modal.init(modalalert);
        var instance = M.Modal.getInstance(modalalert);   
        instance.open();
        document.querySelector("#zipcode").value = "";
    }
}

<<<<<<< HEAD
var closeModal = document.getElementById("x");
closeModal.addEventListener("click", function(){
    // var instance = M.Modal.getInstance(closeModal);
    // instance.close();
=======
// Closes the modal
var closeModal = document.getElementById("x"); 
closeModal.addEventListener("click", function() {
>>>>>>> a5cd3efe75f2d69c3e9eaa4f367703c4933e4ad9
    location.reload();
});

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN WILL HAPPEN ON THE SECOND PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
