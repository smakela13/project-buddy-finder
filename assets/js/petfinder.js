// _________PETFINDER SCRIPT STARTS HERE___________


let apiKey = "mPLuBul6G12XM99wSZsV1LJj4B1RnvgKYo7qZThtAvoM6uNqun"; // put your key here
let secret = "uMuiXKqNHfLNcLsmyuEhA0P26uZrjhS5yzZpIH9Y"; // put your secret here
let token;
let testURL = "https://api.petfinder.com/v2/animals";


// form element variable
var buddyFormEl = document.querySelector("#buddy-form");
// input element variable
var inputEl = document.querySelector("#zipcode");
// card container div element variable
var cardContainerEl = document.querySelector("#previously-viewed");



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

                fetchToPetFinder(queryURL, function (data) {
                    console.log('this is the data from pet finder', data);
                    console.log('this happens after the fetch happens!');
                });
                // all of your function calls here
                // an example of how to use a fetch call


            // GETTING DATA FROM LOCAL STORAGE 

                function getStoredOrgs(){
                    for (var j = 0; j < localStorage.length; j++) {
                    var key = localStorage.key(j);
                    console.log(key);
                    var storedOrg = JSON.parse(window.localStorage.getItem(key));
                    console.log(storedOrg);
                
                    var orgPrevViewed = document.querySelector("#previously-viewed");
                    var storedBtn = document.createElement("button");
                    
                    storedBtn.classList.add("absolute", "inset-y-0", "right-0", "flex", "items-center", "px-4", "text-white", "bg-blue-300");
                    storedBtn.textContent = storedOrg.name + " - " + storedOrg.address.city;
                    orgPrevViewed.appendChild(storedBtn);
                
                    storedBtn.setAttribute("postcode", storedOrg.address.postcode);
                    
                    storedBtn.addEventListener("click", function(event){
                
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

            // SUBMIT EVENT

                function formSubmitHandler(event) {
                    event.preventDefault();
                
                    var zipcodeEntered = inputEl.value.trim();
                        
                    console.log(zipcodeEntered);
                    
                    if (zipcodeEntered) {
                      searchPetfinder(zipcodeEntered);
                      inputEl.value = "";
                      
                    //   activeCityNameEl.textContent = ""; - ANY FIELD TO BE EMPTIED HERE!
                      
                    } else {
                      alert("Please enter a zipcode");
                    }
                };
                
                buddyFormEl.addEventListener('submit', formSubmitHandler);

                
            // SEARCHING PETFINDER - SAME AS fetchToPetFinder
            
                function searchPetfinder(zipcode) {
                    var petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations";
                
                    if (zipcode) {
                    petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations/?location=" + zipcode + "&distance=10&limit=5";

                    }
                    
                    console.log(petfinderOrganizationUrl);
                    
                    fetch(petfinderOrganizationUrl)
                    .then(function (response) {
                        if (!response.ok) {
                        throw response.json();
                        }
                        return response.json();
                    })
                
                    .then(function (petfinderResult) {
                        
                        console.log(petfinderResult);
                
                        if (!petfinderResult.length) {
                            alert("No results found!");
                        } else {
                            for (var i = 0; i < petfinderResult.length; i++) {
                            printPetfinderResults(petfinderResult[i]);
                            }
                        }
                    })
                            
                }
            

            // PRINTING THE RESULTS FROM PETFINDER

                function printPetfinderResults(resultOrg) {
                    console.log(resultOrg);
                // new button container div element variable
                    var orgList = document.querySelector("#result-log");
                    var resultBtn = document.createElement("button");
                    
                    resultBtn.classList.add("absolute", "inset-y-0", "right-0", "flex", "items-center", "px-4", "text-white", "bg-blue-300");
                    // resultBtn.value = resultOrg.name;
                    resultBtn.textContent = resultOrg.name + " - " + resultOrg.address.city;
                    orgList.appendChild(resultBtn);
        
                    // this attribute "postcode" is to be used for Map API
                    resultBtn.setAttribute("postcode", resultOrg.address.postcode);
                                        
                    resultBtn.addEventListener("click", function(event){
                
                    // cardContainerEl.innerHTML = "";
                    // activeCityNameEl.textContent = "";
                    // activeCityIconEl.textContent = "";
                    // activeCityNameEl.textContent = resultObj.name + " - " + resultObj.state;
                    
                    var postcode = event.target.getAttribute("postcode");
                    
                    // searchMap(postcode); Will call get-map-API code.
                    window.localStorage.setItem(resultOrg.name, JSON.stringify({
                    name: resultOrg.name,
                    state: resultOrg.address.city,
                    postcode: resultOrg.address.postcode,
                    }));
                    });
                    
                }
              





                // fetchToPetFinder(testURL);
                // change some stuff on the page
                // storeData();
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
// kick things off
getToken();



let queryURL = "https://api.petfinder.com/v2/organizations/?location=27516&distance=10&limit=5";



    // fetch("https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}", {
    //             headers: {
    //               Authorization: "Bearer {YOUR_ACCESS_TOKEN}"
    //             }
    //           })          



