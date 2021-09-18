console.log("This is the js file for main popup")

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
        document.getElementById("URL").innerHTML = current_url;
        var url = greenfoundation + current_url;
        fetch(url)
        .then(response => response.json())  
        .then(json => {
                console.log(json);
                document.getElementById("API_RESPONSE").innerHTML = JSON.stringify(json);
                if(json.green === true) {
                    console.log("Eco friendly servers")
                    document.getElementById("green_server").innerHTML = "green";
                }
                else if(json.green === false) {
                    console.log("Non eco friendly servers")
                    document.getElementById("green_server").innerHTML = "not green";
                }
            }
            )    
        .catch(err => console.log('Request Failed', err)); 
    }
    );
    }

document.getElementById("green_server").addEventListener("click", update_status);
