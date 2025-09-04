import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import getWeatherData from "../services/api";
import WeatherCard from "./WeatherCard";
import "./LocationBar.css";

const libraries = ["places"];

function LocationBar() {
  const [center, setCenter] = useState({ lat: 52.3676, lng: 4.9041 });
  const [selected, setSelected] = useState("");
  const [advisories, setAdvisories] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const onSubmit = async () => {
    const data = await getWeatherData(center, selected);
    setAdvisories(data.advisories);
    setWeatherData({ list: data.weather_snapshot });
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="search-bar">
        <Autocomplete
          className="text-location"
          onPlaceSelected={(place) => {
            if (place.geometry) {
              setCenter({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
            }
          }}
          options={{ types: ["(regions)"] }}
          defaultValue="Amsterdam"
        />

        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="" disabled hidden>
            Crop
          </option>
          <option value="corn">Corn</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="soybeans">Soybeans</option>
          <option value="chickpeas">Chickpeas</option>
          <option value="tomatoes">Tomatoes</option>
          <option value="potatoes">Potatoes</option>
          <option value="cotton">Cotton</option>
          <option value="coffee">Coffee</option>
        </select>

        <button onClick={onSubmit}>Advise</button>
      </div>

      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
      {advisories && weatherData && (
        <WeatherCard
          advisories={advisories}
          weatherData={weatherData}
          crop={selected}
        />
      )}
    </LoadScript>
  );
}

export default LocationBar;
