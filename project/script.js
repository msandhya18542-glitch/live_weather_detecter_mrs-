// Replace with your OpenWeatherMap API key
const apiKey = "2ec0dd96c69ad35e20e47e369ce83392";

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const errorMsg = document.getElementById("error");
const loading = document.getElementById("loading");

// Weather data elements
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

// Event Listener
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    // Input validation
    if (cityName === "") {
        showError("Please enter a city name");
        return;
    }

    getWeather(cityName);
});

// Fetch Weather Data
async function getWeather(cityName) {
    try {
        // Show loading
        loading.classList.remove("hidden");
        weatherCard.classList.add("hidden");
        errorMsg.classList.add("hidden");

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        // Handle invalid city
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update UI
        updateUI(data);

    } catch (error) {
        showError(error.message);
    } finally {
        loading.classList.add("hidden");
    }
}

// Update DOM
function updateUI(data) {
    weatherCard.classList.remove("hidden");

    temp.innerText = `${data.main.temp}°C`;
    city.innerText = data.name;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`;
    description.innerText = data.weather[0].description;

    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Show Error
function showError(message) {
    errorMsg.innerText = message;
    errorMsg.classList.remove("hidden");
    weatherCard.classList.add("hidden");
}