document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "42f1877e172024b84ea97fd604b16e4e"; // Replace with your actual API key
    const getWeatherButton = document.getElementById("getWeatherButton");
    const locationInput = document.getElementById("locationInput");
    const weatherResult = document.getElementById("weatherResult");

    getWeatherButton.addEventListener("click", async function () {
        const location = locationInput.value;
        if (location.trim() === "") {
            alert("Please enter a location.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.status === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature from Kelvin to Celsius
                const humidity = data.main.humidity;

                const weatherText = `Weather in ${location}: ${weatherDescription}<br>Temperature: ${temperature}°C<br>Humidity: ${humidity}%`;
                weatherResult.innerHTML = weatherText;
            } else {
                weatherResult.innerHTML = "Location not found. Please try again.";
            }
        } catch (error) {
            console.error("Error fetching data: " + error);
            weatherResult.innerHTML = "An error occurred while fetching weather data.";
        }
    });
});
