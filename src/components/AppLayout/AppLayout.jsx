import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../Context/HotelsProvider";

function AppLayout() {
  const { isLoading, hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map isLoading={isLoading} markerLocation={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;
