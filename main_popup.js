console.log("This is the js file for main popup")

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
                document.getElementById("DATA_CONSUMED").innerHTML = result.toString() + " kb";
            }
            )    
        .catch(err => console.log('Request Failed', err)); 
    });
}

document.getElementById("green_server").addEventListener("click", page_speed);