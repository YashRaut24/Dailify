import { useState } from "react";
import "./Weather.css";

function Weather({ title, description }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = "05a5d29c3dfde896168533277550788c";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="card">
        {/* Sky landscape section */}
        <section className="landscape-section">
          <div className="sky"></div>
          <div className="sun"></div>
          <div className="hill-1"></div>
          <div className="hill-2"></div>
          <div className="ocean">
            <div className="reflection"></div>
            <div className="reflection"></div>
            <div className="reflection"></div>
            <div className="reflection"></div>
            <div className="reflection"></div>
            <div className="shadow-hill-1"></div>
            <div className="shadow-hill-2"></div>
          </div>
          <div className="hill-3"></div>
          <div className="hill-4"></div>
          <div className="filter"></div>
        </section>

        {/* Weather Info */}
        <section className="content-section">
          <div className="weather-info">
            <div className="left-side">
              <div className="icon">
                {weather && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
              </div>
              <p>{weather ? weather.weather[0].main : "Weather"}</p>
            </div>
            <div className="right-side">
              <div className="location">
                <span>{weather ? weather.name : "Location"}</span>
              </div>
              <p>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <p className="temperature">
                {weather ? Math.round(weather.main.temp) : "--"}°C
              </p>
            </div>
          </div>
          <div className="forecast">
            <div>
              <p>Humidity</p>
              <p>{weather ? weather.main.humidity : "--"}%</p>
            </div>
            <div className="separator"></div>
            <div>
              <p>Wind</p>
              <p>{weather ? Math.round(weather.wind.speed) : "--"} km/h</p>
            </div>
            <div className="separator"></div>
            <div>
              <p>Feels like</p>
              <p>{weather ? Math.round(weather.main.feels_like) : "--"}°C</p>
            </div>
          </div>
        </section>

        {/* Controls */}
        <div className="weather-controls">
          <input
            type="text"
            placeholder="Enter City name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="weather-input"
          />
          <button className="weather-btn" onClick={fetchWeather}>
            Check
          </button>
        </div>
        {error && <p className="error-message">⚠️ {error}</p>}
      </div>
    </div>
  );
}

export default Weather;
