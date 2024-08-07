import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "25px",
};

const originalWarn = console.warn;

console.warn = function (message, ...args) {
  if (
    typeof message === "string" &&
    message.includes("google.maps.Marker is deprecated")
  ) {
    return;
  }
  // Llama al console.warn original para otros mensajes
  originalWarn.call(console, message, ...args);
};

const center = {
  lat: -0.180653,
  lng: -78.467834,
};

const libraries = ["places"];

const GoogleMaps = ({ direccion, setDireccion }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    if (direccion) {
      // Uso de Geocoder para dar las coordenadas
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: direccion }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error("No se pudo geocodificar la dirección:", status);
        }
      });
    }
  }, [direccion]);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      setMarkerPosition({ lat: clickedLat, lng: clickedLng });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: clickedLat, lng: clickedLng } },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const address = results[0].formatted_address;
              // actualiza a la nueva dirección
              setDireccion(address); 
            } else {
              console.error("No se encontraron resultados de geocodificación");
            }
          } else {
            console.error("Error en la geocodificación inversa:", status);
          }
        }
      );
    },
    [setDireccion]
  );
  useEffect(() => {
    return () => {
      console.warn = originalWarn; // Restaura console.warn
    };
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
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
