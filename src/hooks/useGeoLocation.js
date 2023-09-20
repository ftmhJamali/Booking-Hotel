import { useState } from "react";

export default function useGeoLocation() {
  const [geoloading, setGeoLoading] = useState(false);
  const [geoPosition, setGeoPosition] = useState({});
  const [error, setError] = useState(null);
  function getPosition() {
    if (!navigator.geolocation) {
      return setError("your browser does not support geoLocation!");
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoLoading(false);
      },
      (error) => {
        setError(error.message);
        setGeoLoading(false);
      }
    );
  }
  return { geoPosition, error, geoloading, getPosition };
}
