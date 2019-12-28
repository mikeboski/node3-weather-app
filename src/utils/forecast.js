const request = require("request");

const forecast = (lat, long, callback) => {
    let url = `https://api.darksky.net/forecast/fb853046a34b79aef492398b140b116d/${lat},${long}`;
    //url += "?units=si";
    console.log("Powered by Dark Sky. https://darksky.net/poweredby/");
    console.log(url);
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather services.(Check that you have an Internet connection)", false);
        } else {
            console.log(response.body);
            const data = response.body;
            const {temperature, precipProbability} = response.body.currently;
            console.log(data);
            if (typeof(data) != "undefined") {
            const {summary} = response.body.daily.data[0];
                //console.log(`${today.summary} It is currently ${data.temperature} degees F out. There is a ${data.precipProbability}% chance of rain.`);
                callback(false, {
                    temp: temperature,
                    rainPercent: precipProbability,
                    summary: summary
                });
            } else {
                console.log("Debugging info 002:", response.body);
                callback("No data returned from darksky.net", false);
            }
        }
    });
};
module.exports = forecast;