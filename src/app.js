// Feature: show current day, month, year and time

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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let day = days[now.getDay()];
currentDayTime.innerHTML = `${day} | ${currentMonth} ${date}, ${year} | ${hours}:${minutes}`;

//function and API call for getting city coordinates for the weather forecast feature
function getForecast(coordinates) {
  let apiKey = "95b73a6940f2f07006ff745f669cf92a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  let descriptionElement = document.querySelector(".weather-description");
  descriptionElement.innerHTML = description;

  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  document.querySelector(".search-input").value;
  document.querySelector(".city").innerHTML = response.data.name.replace(
    "Arrondissement de",
    ""
  );

  let iconElement = document.querySelector("#icon"); //current-weather-description-icon
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord); // part of function and API call for getting city coordinates for the weather forecast feature
}

//Feature: Search city and a default city
//make API call to OpenWeather API, display city name and temperature

function search(city) {
  let apiKey = "95b73a6940f2f07006ff745f669cf92a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector(".search-input");
  search(city.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

search("Cincinnati");

// Geo-location
function searchLocation(position) {
  let apiKey = "95b73a6940f2f07006ff745f669cf92a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", getCurrentLocation);

//Display weather forecast (note: API call is made in the function getForecast(coordinates), it is above function showTemperature(response))

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = '<div class="row">';

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="45"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° | </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
