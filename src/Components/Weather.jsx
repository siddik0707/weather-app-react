import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import ClearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "City not found");
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || ClearIcon;
      setWeatherData({
        humidity: data.main.humudity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setWeatherData(false);
      console.error("Error fetching weather data:", err);
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={searchIcon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temp">{weatherData.temperature}°c</p>
          <p className="loc">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="" />
            </div>
            <div>
              <p>9{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
            <div className="col">
              <img src={windIcon} alt="" />
            </div>
            <div>
              <p>{weatherData.windSpeed} Km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
