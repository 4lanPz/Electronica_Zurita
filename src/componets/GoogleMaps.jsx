import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "25px",
};

const center = {
  lat: -0.180653,
  lng: -78.467834,
};

// Definir libraries como una constante
const libraries = ["places"];

const GoogleMaps = ({ setDireccion }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries, // Pasar la constante libraries aquí
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      setMarkerPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const address = results[0].formatted_address;
            setDireccion(address);
          } else {
            console.error("No se encontraron resultados de geocodificación");
          }
        } else {
          console.error("Error en la geocodificación inversa:", status);
        }
      });
    },
    [markerPosition, setDireccion]
  );

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={{
            disableStreetView: true, // Deshabilita la vista de StreetView
          }}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GoogleMaps;
