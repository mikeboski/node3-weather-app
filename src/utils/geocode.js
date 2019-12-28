const request = require("request");

const getLongLatOfAddress = (address, callback) => {
    //https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=
    const mapboxBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const mapboxToken = "pk.eyJ1IjoibWlrZWJvc2tpIiwiYSI6ImNrNGppNmwycTF2dHUzb3FldDBqam9keWoifQ.X2Tk6aO2oIi5E3YJzj8E7w";
    let url = mapboxBaseUrl + encodeURI(address) + ".json?access_token=" + mapboxToken + "&limit=1";
    console.log(url);
    request({
        url,
        json: true
    }, (error, response) => {
        if(error) {
            callback("Unable to connect to locations services.(Check that you have an Internet connection)", false);
        } else { 
            const data = response.body.features;
            if (data != undefined) {
                if(data.length >0) {
                    callback(false,{
                        lat: data[0].center[1],
                        long: data[0].center[0],
                        place_name: data[0].place_name
                    });
                    console.log(`Long: ${data[0].center[0]} | Lat: ${data[0].center[1]}`);
                } else {
                    callback("Address entered did not return a location try to be more specific.",false);
                }
            } else {
                console.log("Debugging info 001:", response.body);
                callback("No data returned from MapBox",false);
            }
        }
    });
};
module.exports = getLongLatOfAddress;
