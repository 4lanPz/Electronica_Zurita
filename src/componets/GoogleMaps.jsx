import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  marginTop: "25px",
};

const center = {
  lat: -0.180653,
  lng: -78.467834,
};

const GoogleMaps = ({ setDireccion }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [loading, setLoading] = useState(false);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handleConfirmDireccion = () => {
    if (markerPosition) {
      const geocoder = new window.google.maps.Geocoder();
      setLoading(true);
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
        setLoading(false);
      });
    }
  };

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
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) =>
              setMarkerPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              })
            }
          />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <div className="flex justify-center p-3 mb-5">
        <div className="text-center poppins-regular bg-[#5B72C3] green p-2 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all w-1/3">
          <button
            type="button"
            onClick={handleConfirmDireccion}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Confirmar Dirección"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
