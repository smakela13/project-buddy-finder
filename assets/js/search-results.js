// _________SECOND PAGE PETFINDER SCRIPT STARTS HERE___________


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
    // #result-log will be changed
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
