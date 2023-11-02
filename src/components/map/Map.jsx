import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./map.css";
function Map({ lat, lng }) {
  const center = { lat: lat, lng: lng };
  console.log(center);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF position={center} />
      </GoogleMap>
      <br></br>
      <br></br>
    </>
  );
}

export default Map;
