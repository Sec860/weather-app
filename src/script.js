


let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let temperature = document.querySelector("#temperature-data")
let citySearch = document.querySelector("#search-result");
let userInput = document.querySelector("#search-box")
let apiKey = `0a8d04c2a1eeee18ec7890af586e6c13`


let form = document.querySelector("form")
form.addEventListener("submit", searchCity);

showStartUp("Florence")

function showStartUp(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showWeather)
}

function searchCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showWeather)
}

function formatTime(timestamp) {  
  let date = new Date(timestamp);
  let hours = date.getHours();
    if (hours < 10) { `0${hours}`}
  let minutes = date.getMinutes();
    if (minutes < 10) { `0${minutes}`}
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = weekdays[date.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", " December"]
  let month = months[date.getMonth()];
  let day = date.getDate();
  return `${weekday}, ${month} ${day} - ${hours}:${minutes}` 
}
function showWeather(response) {
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`
  citySearch.innerHTML = (response.data.name);
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} mph`
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)}`
  document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].main}`
  date = document.querySelector("#logo")
  date.innerHTML = formatTime(response.data.dt * 1000)
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${(response.data.weather[0].icon)}@2x.png`)
  showForecast()
}

function showForecast() {
  let forecastElement= document.querySelector("#forecast")

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", " Friday", "Saturday"]
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day) {forecastHTML = forecastHTML + `
        <div class="col-2 weekday">${day} </br>
        <img src=""
        alt = "Sunny"
        width = ""
        />
        <div class="weekday-temperature">21℃
        </div>
        </div>
       `
})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML}

celsius.addEventListener("click", chooseCelsius)

function chooseCelsius(event) {
  event.preventDefault()
  citySearch.innerHTML = userInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showCelsius)
}

function showCelsius(response) {
temperature.innerHTML = `${Math.round(response.data.main.temp)}℃`
document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`
}

fahrenheit.addEventListener("click", chooseFahrenheit)

function chooseFahrenheit(event) {
  event.preventDefault()
  citySearch.innerHTML = userInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showFahrenheit)
}

function showFahrenheit(response) {
temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`
document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} mph`
}

let geolocation = document.querySelector("#geolocation");
geolocation.addEventListener("click", getPosition)

function getPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchLocation)
}

function searchLocation(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
axios.get(apiUrl).then(showLocationWeather)
}

function showLocationWeather(response) {
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`
  citySearch.innerHTML = `${response.data.name}`
   document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} mph`
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)}`
  document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].main}`
  date = document.querySelector("#logo")
  date.innerHTML = formatTime(response.data.dt * 1000)
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${(response.data.weather[0].icon)}@2x.png`)
}

