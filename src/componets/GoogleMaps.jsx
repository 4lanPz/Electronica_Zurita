import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "25px",
};

const center = {
  lat: -0.180653,
  lng: -78.467834,
};

const libraries = ["places"];

const GoogleMaps = ({ setDireccion }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = useCallback(
    (event) => {
      const { latLng } = event;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
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

      // Actualizar la posición del marcador
      setMarkerPosition({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
    },
    [setDireccion]
  );

  if (loadError) return <div>Error al cargar el mapa</div>;

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onClick={handleMapClick}
        >
          {/* AdvancedMarker con imagen personalizada */}
          <AdvancedMarker position={markerPosition}>
            {/* Asegúrate de que la ruta de la imagen sea correcta */}
            <img
              src="/images/marker.png" // Ruta relativa correcta desde la raíz del sitio
              alt="Marker"
              style={{ width: "32px", height: "32px" }}
            />
          </AdvancedMarker>
        </GoogleMap>
      ) : (
        <div>Cargando mapa...</div>
      )}
    </div>
  );
};

export default GoogleMaps;
