import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useHotels } from "../Context/HotelsProvider";
import { useEffect, useState } from "react";
import "../../App.css";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
const Map = () => {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([20, -3]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { geoPosition, geoloading, getPosition } = useGeoLocation();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <button onClick={getPosition} className="getLocation">
          {geoloading ? "loading..." : "Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker position={[item.latitude, item.longitude]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
