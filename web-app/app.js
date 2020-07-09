// api key : 82005d27a116c2880c8f0fcb866998a0
const notificationelement = document.querySelector('.notification');
const iconelement = document.querySelector('.weather-icon');
const tempelement = document.querySelector('.temperature-value p');
const descelement = document.querySelector('.temperature-description p');
const locationelemnt = document.querySelector('.location p');
//creatiing an object to store the data
const weather = {};
weather.temperature = {
    unit :"celcius"
}
//api key
const key = "82005d27a116c2880c8f0fcb866998a0";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{// .style.display method is used to display the text within the pop up
    notificationelement.style.display = "block";
    notificationelement.innerHTML = "<p>Browser does not support </p>"
}
function setPosition(position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    getWeather(latitude,longitude);
}
function showError(error){
    notificationelement.style.display = "block";
    notificationelement.innerHTML = `${error.message}`;

}
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - 273);
            weather.description = data.weather[0].description;
            weather.iconID = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
       
}
function displayWeather(){
    iconelement.innerHTML = `<img src="icons/${weather.iconID}.png">`;
    tempelement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    locationelemnt.innerHTML = `<p>${weather.city} ${weather.country}</p>`;
    descelement.innerHTML = `${weather.description}`;

}
