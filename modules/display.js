// DOM Manipulation

const name = document.getElementById("name");
const date = document.getElementById("date");
const time = document.getElementById("time");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const conditionImg = document.getElementById("condition-img");
const thermalSensation = document.getElementById("thermal-sensation");
const cloudCoverage = document.getElementById("cloud-coverage");
const precipitationAmount = document.getElementById("precipitation-amount");
const windSpeed = document.getElementById("wind-speed");
const airHumidity = document.getElementById("air-humidity");
const uvIndex = document.getElementById("uv-index");

const dayElements = [
  {
    day: document.getElementById("1-day"),
    conditionImg: document.getElementById("1-condition-img"),
    condition: document.getElementById("1-condition"),
    maxTemperature: document.getElementById("1-max-temperature"),
    minTemperature: document.getElementById("1-min-temperature"),
    chanceOfRain: document.getElementById("1-chance-of-rain"),
  },
  {
    day: document.getElementById("2-day"),
    conditionImg: document.getElementById("2-condition-img"),
    condition: document.getElementById("2-condition"),
    maxTemperature: document.getElementById("2-max-temperature"),
    minTemperature: document.getElementById("2-min-temperature"),
    chanceOfRain: document.getElementById("2-chance-of-rain"),
  },
  {
    day: document.getElementById("3-day"),
    conditionImg: document.getElementById("3-condition-img"),
    condition: document.getElementById("3-condition"),
    maxTemperature: document.getElementById("3-max-temperature"),
    minTemperature: document.getElementById("3-min-temperature"),
    chanceOfRain: document.getElementById("3-chance-of-rain"),
  },
];

const gradientElements = document.getElementsByClassName("gradient");

function displayCurrentData(currentData) {
  name.textContent = `${currentData.name}, ${currentData.country}`;
  date.textContent = getDate(currentData.dateTime, "en-US", "long");
  temperature.textContent = `${currentData.temperature} °C`;
  thermalSensation.textContent = `Feels like ${currentData.thermalSensation} °C`;
  condition.textContent = currentData.condition;
  conditionImg.src = currentData.conditionIcon;
  cloudCoverage.textContent = `${currentData.cloudCoverage}%`;
  precipitationAmount.textContent = `${currentData.precipitationAmount} mm`;
  windSpeed.textContent = `${currentData.windSpeed} kph`;
  airHumidity.textContent = `${currentData.airHumidity}%`;
  uvIndex.textContent = currentData.uvIndex;
}

function displayForecastData(forecastData) {
  forecastData.forEach((data, index) => {
    dayElements[index].day.textContent = getDay(data.date, "en-US", "long");
    dayElements[index].conditionImg.src = data.conditionIcon;
    dayElements[index].condition.textContent = data.condition;
    dayElements[
      index
    ].maxTemperature.textContent = `hi | ${data.maxTemperature} °C`;
    dayElements[
      index
    ].minTemperature.textContent = `lo | ${data.minTemperature} °C`;
    dayElements[index].chanceOfRain.textContent = `🌧️ ${data.chanceOfRain}%`;
  });
}

function displayGradient(currentData) {
  const cloudyWords = [
    "cloudy",
    "overcast",
    "mist",
    "dnow",
    "ice",
    "blizzard",
    "fog",
    "frizzle",
    "light",
    "patchy",
    "moderate",
  ];
  const stormyWords = ["heavy", "thunder", "shower"];

  // Check if cloudy, stormy, day
  const condition = currentData.condition.toLowerCase();
  const isCloudy = cloudyWords.some((word) => condition.includes(word));
  const isStormy = stormyWords.some((word) => condition.includes(word));
  const isDay = conditionImg.src.includes("day");

  // Change gradient
  let time = "night";
  let weather = "";

  if (isDay) time = "day";
  if (isCloudy) weather = "-cloudy";
  if (isStormy) weather = "-stormy";

  cloneDetails("details-fix-container", "details-container");
  cloneDetails("body", "background-overlay");

  Array.from(gradientElements).forEach((element) => {
    element.style.background = `var(--${time}${weather})`;
  });
}

function cloneDetails(fix, original) {
  const fixContainer = document.getElementById(fix);
  const container = document.getElementById(original);
  const clonedContainer = container.cloneNode(true);

  clonedContainer.classList.add("gradient-overlay");
  clonedContainer.classList.remove("gradient");

  fixContainer.appendChild(clonedContainer);

  setTimeout(() => {
    clonedContainer.remove(); // Removes the element from the DOM
  }, 2000);
}

function displayLoading(toggle) {
  const loading = document.getElementById("loading");
  const loadingImg = document.getElementById("loading-img");

  loadingImg.src = "images/icons/loading.gif?a=" + Math.random();
  loading.style.visibility = toggle;
}

function getDay(dateStr, locale, length) {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: length });
}

function getDate(dateStr, locale, length) {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: length,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export {
  displayCurrentData,
  displayForecastData,
  displayGradient,
  displayLoading,
};
