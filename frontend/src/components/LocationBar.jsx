import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./LocationBar.css";
function LocationBar() {
  // Keep track of the map center (and marker position)
  const [center, setCenter] = useState({ lat: 52.3676, lng: 4.9041 }); // Amsterdam default

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
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
