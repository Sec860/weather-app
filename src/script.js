

let date = new Date();

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday = weekdays[date.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", " December"]
let month = months[date.getMonth()];
let day = date.getDate();
let year = date.getFullYear();


date = document.querySelector("#logo")
date.innerHTML = `${weekday}, ${month} ${day}, ${year}`

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

function showWeather(response) {
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`
  citySearch.innerHTML = (response.data.name);
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)}`
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)}`
    document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].main}`

}

celsius.addEventListener("click", chooseCelsius)

function chooseCelsius(event) {
  event.preventDefault()
  citySearch.innerHTML = userInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showCelsius)
}

function showCelsius(response) {
temperature.innerHTML = `${Math.round(response.data.main.temp)}℃`}

fahrenheit.addEventListener("click", chooseFahrenheit)

function chooseFahrenheit(event) {
  event.preventDefault()
  citySearch.innerHTML = userInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showFahrenheit)
}

function showFahrenheit(response) {
temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`}

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
axios.get(apiUrl).then(showLocationWeather)}

function showLocationWeather(response) {
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`
  citySearch.innerHTML = `${response.data.name}`
   document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)}`
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)}`
  document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].main}`
}

//if latitude long > xxx then Celsius
//change symbol
//wind/humidity/prec
