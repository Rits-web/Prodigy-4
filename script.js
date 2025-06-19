const API_KEY = "96a8dcb20dfb52f1c63c196621e5ea79"; // Your API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  } else {
    alert("Please enter a city name.");
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => {
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img class="weather-icon" src="${icon}" alt="${data.weather[0].description}">
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡 Temperature: ${data.main.temp} °C (Feels like: ${data.main.feels_like} °C)</p>

        <div class="widget">
          <div>💧 Humidity: ${data.main.humidity}%</div>
          <div>🌬 Wind: ${data.wind.speed} m/s</div>
        </div>
        <div class="widget">
          <div>📊 Pressure: ${data.main.pressure} hPa</div>
          <div>☁ Cloudiness: ${data.clouds.all}%</div>
        </div>
      `;
      document.getElementById("weatherInfo").innerHTML = html;
    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
