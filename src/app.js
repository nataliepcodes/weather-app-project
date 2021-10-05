// Feature: show current day and time
let now = new Date();
let currentDayTime = document.querySelector("div.current-day");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;

//Display searched city temp, humidity, wind, current status (via API call)

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector(".current-temperature");
  tempElement.innerHTML = temperature;

  let humidity = Math.round(response.data.main.humidity);
  let humElement = document.querySelector(".humidity-value");
  humElement.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind-value");
  windElement.innerHTML = wind;
  console.log(response.data);

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector(".weather-status");
  descriptionElement.innerHTML = description;

  document.querySelector(".city").innerHTML =
    document.querySelector(".city-input").value;
}

//Feature: Search city
//make API call to OpenWeather API, display city name and temperature

function searchCity(event) {
  event.preventDefault();
  let apiKey = "95b73a6940f2f07006ff745f669cf92a";
  let city = document.querySelector(".city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);
