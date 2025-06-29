async function getWeather() {Add commentMore actions
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultBox.innerHTML = "<p>Loading...</p>";

  try {
    const apiKey = "7f6db307132445caa11171545251806"; // Replace with your actual key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<p>${data.error.message}</p>`;
      return;
    }

    resultBox.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
    `;
  } catch (error) {
    console.error("Weather fetch error:", error);
    resultBox.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
  }
}
