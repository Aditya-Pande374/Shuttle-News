const weatherInfo = document.getElementById('weather-info');
const weatherType = document.getElementById('weather-type');
const weatherLogo = document.getElementById('weather-logo');
const updateDateTime = document.getElementById('date-time');

const weatherAPIKey = "ae12d3c13ecc8ae0faca5931b6d8732c";
const cityValue = "New Delhi";

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherAPIKey}&units=metric`;

getWeatherData(cityValue);
getDateTime(); // Initial call to set current time
setInterval(getDateTime, 1000); // Update time every minute (60000 milliseconds)

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Network Response not Ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfo.textContent = `${temperature}°C`;
        weatherType.textContent = `${desc}`;
        weatherLogo.src = `http://openweathermap.org/img/wn/${icon}.png`;
    } catch (error) {
        console.error(error);
    }
}

function getDateTime() {
    const d = new Date();
    const hours = d.getHours();
    const min = d.getMinutes().toString().padStart(2,'0');
    const sec = d.getSeconds().toString().padStart(2,'0');

    updateDateTime.textContent = `${hours} : ${min} : ${sec}`;
}
