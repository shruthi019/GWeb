//########################################################\\
//                                                        \\
//                 RANDOM QUOTE IN POPUP                  \\
//                                                        \\
//########################################################\\

const quotes = ["Set your computer to go into sleep or hibernate to conserve energy when you’re taking a break.", 
                "Dimming your monitor from 100% to 70% can save up to 20% of the energy the monitor uses.",
                "Streaming music and videos adds more to your digital carbon footprint than downloading it.",
                "Playing videos uses more energy",
                "The footprint of an email also varies dramatically, from 0.3g CO2e for a spam email",
                "Spending less time on unnecessary 'thank you' messages can reduce the carbon footprint of email"]


function get_random_quote() {
    var rand_idx = Math.floor((Math.random() * 5) + 0);
    document.getElementById('random_q').innerHTML = quotes[rand_idx]
}

get_random_quote()