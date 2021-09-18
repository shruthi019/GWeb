console.log("This is the js file for main popup")
const KWG_PER_GB = 1.805;
const RETURNING_VISITOR_PERCENTAGE = 0.75;
const FIRST_TIME_VIEWING_PERCENTAGE = 0.25;
const PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
const CARBON_PER_KWG_GRID = 475;
const CARBON_PER_KWG_RENEWABLE = 33.4;
const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = 0.8992;
const CO2_GRAMS_TO_LITRES = 0.5562;

//########################################################\\
//                                                        \\
//             GREEN WEB FOUNDATION API                   \\
//                                                        \\
//########################################################\\

const greenfoundation = 'https://api.thegreenwebfoundation.org/api/v3/greencheck/'

const getHostname = (url) => {
    return new URL(url).hostname;
}

async function update_status(){
    var current_url = null
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        var complete_url = tabs[0].url
        current_url = getHostname(complete_url)
        document.getElementById("URL").innerHTML = "URL: " + current_url;
        var url = greenfoundation + current_url;
        fetch(url)
        .then(response => response.json())  
        .then(json => {
                console.log(json);
                //document.getElementById("API_RESPONSE").innerHTML = JSON.stringify(json);
                if(json.green === true) {
                    console.log("Eco friendly servers")
                    document.getElementById("green_server").innerHTML = "green";
                    document.getElementById("HOSTING_GREEN").innerHTML = "Yayy! This website is hosted on a green server.";
                }
                else if(json.green === false) {
                    console.log("Non eco friendly servers")
                    document.getElementById("green_server").innerHTML = "not green";
                    document.getElementById("HOSTING_GREEN").innerHTML = "Nay! This website is NOT hosted on a green server.";
                    //document.body.style.backgroundColor = '#FF3800';
                    document.body.style.backgroundImage = 'url("/icons/wavered.svg")';
                }
            }
            )    
        .catch(err => console.log('Request Failed', err)); 
    }
    );
    }

document.getElementById("green_server").addEventListener("click", update_status);


//########################################################\\
//                                                        \\
//           CHROME PAGE SPEED INSIGHTS API               \\
//                                                        \\
//########################################################\\

const page_speed_api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url="
var r;

function page_speed(){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
        var complete_url = page_speed_api + tabs[0].url
        fetch(complete_url)
        .then(response => response.json())  
        .then(obj => {
                r = obj
                console.log(obj);
                var result = obj.lighthouseResult.audits["total-byte-weight"].numericValue / 1000
                var energy_consumption = (result * 1000) * KWG_PER_GB / 1073741824
                var co2 = energy_consumption * CARBON_PER_KWG_GRID
                document.getElementById("CO2_EMITTED").innerHTML = "Co2 produced by this url: " + co2.toString() + "gm";
                document.getElementById("DATA_CONSUMED").innerHTML = "Data consumed by this url: " + result.toString() + " kb";
            }
            )    
        .catch(err => console.log('Request Failed', err)); 
    });
}

document.getElementById("green_server").addEventListener("click", page_speed);
