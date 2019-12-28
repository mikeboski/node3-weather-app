console.log('Client side javascript file is loaded!');
let address = new URLSearchParams(document.location.search).get("address");


const getWeather = () => {
    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            let message = '';
            if (data.error) {
                message = data.error; //+"<br>You entered:"+data.address;
            } else {
                message = `<div>Location:<br><b>${data.location}</b></div><div>Current Weather conditions:<br><b>${data.weatherString}</b></div>`;
            }
            const alertDiv = document.createElement("div");
            alertDiv.innerHTML = message;
            const mainDiv = document.getElementsByClassName("main-content")[0];
            mainDiv.appendChild(alertDiv);
        })
    });
}
if (address) {
    getWeather();
};
const weatherForm = document.getElementById("getweatherform");
const addressInput = document.getElementById("address"); 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    address = addressInput.value;
    getWeather();
    console.log('testing!', address);
});