import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import "./Styles/weather.css";

const Weather = () => {
  const [city, setcity] = useState(null);
  const [search, setsearch] = useState("");

  const fetchData = () => {
    const baseUrl = "http://api.weatherapi.com/v1/";
    const apiKey = "4b04d19a637442d89a793057231209";

    fetch(`${baseUrl}current.json?key=${apiKey}&q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setcity(data);
        console.log(data);
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div className="container">
      <div className="search_bar">
        <input
          type="search"
          name="city"
          placeholder="enter location"
          id="input_field"
          onChange={(event) => {
            setsearch(event.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        {/* <button onClick={fetchData}>Get Weather</button> */}
      </div>
      {city === null ? (
        <p>Enter the City</p>
      ) : (
        <div>
          <div className="weatherInfo">
            {city.current ? (
              <div>
                <h2 className="location">
                  <i className="fa-solid fa-city fa-bounce"></i>
                  {city.location.name}
                </h2>
                <h1 className="temp"> {city.current.temp_c}°C</h1>
                <p>feels like: {city.current.feelslike_c}°C</p>
                <p>uv: {city.current.uv}</p>
                <h2 className="state">{city.location.region}</h2>
                <h2 className="country"> {city.location.country}</h2>
              </div>
            ) : (
              <p>No Weather Data Available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
