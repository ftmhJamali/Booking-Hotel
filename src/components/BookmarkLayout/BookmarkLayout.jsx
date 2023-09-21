import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkListProvider";

const Bookmark = () => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocation={bookmarks} />
      </div>
    </div>
  );
};

export default Bookmark;
