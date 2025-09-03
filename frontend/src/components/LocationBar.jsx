import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./LocationBar.css";
const libraries = ["places"];
function LocationBar() {
  // Keep track of the map center (and marker position)
  const [center, setCenter] = useState({ lat: 52.3676, lng: 4.9041 }); // Amsterdam default
  const [selected, setSelected] = useState("");

  const onSubmit = async () => {};
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
              const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              setCenter(newLocation); // update map + marker
            }
          }}
          options={{
            types: ["(regions)"],
          }}
          defaultValue="Amsterdam"
        />

        <div>
          <label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
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
          </label>
        </div>

        <button onClick={onSubmit}>Advise</button>
      </div>

      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationBar;
