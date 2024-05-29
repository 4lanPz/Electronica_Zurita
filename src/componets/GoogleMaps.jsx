import { useEffect, useState } from "react";

const GoogleMaps = ({ setDireccion }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;
    const scriptId = "google-maps-script";

    const initializeMap = () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API not loaded");
        return;
      }

      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: -0.180653, lng: -78.467834 },
          zoom: 12,
          streetViewControl: false,
          mapTypeControl: false,
        }
      );
      setMap(mapInstance);

      const markerClass =
        window.google.maps.marker?.AdvancedMarkerElement ||
        window.google.maps.Marker;

      if (!markerClass) {
        console.error("No marker class available");
        return;
      }

      const markerInstance = new markerClass({
        position: { lat: -0.180653, lng: -78.467834 },
        map: mapInstance,
        draggable: true,
      });
      setMarker(markerInstance);

      mapInstance.addListener("click", (e) => {
        markerInstance.setPosition(e.latLng);
      });
    };

    const onLoad = () => {
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        console.error("Google Maps API not loaded");
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
      script.id = scriptId;
      document.body.appendChild(script);
      window.initMap = onLoad;
    } else {
      onLoad();
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleConfirmDireccion = () => {
    if (marker) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: marker.getPosition() },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const address = results[0].formatted_address;
              setDireccion(address);
              setLoading(false);
            } else {
              console.error("No se encontraron resultados de geocodificación");
              setLoading(false);
            }
          } else {
            console.error("Error en la geocodificación inversa:", status);
            setLoading(false);
          }
        }
      );
    }
  };

  return (
    <div>
      <div id="map" style={{ height: "500px", marginTop: "25px" }}></div>
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
