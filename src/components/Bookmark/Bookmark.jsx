import React from "react";
import { useBookmark } from "../Context/BookmarkListProvider";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmarks } = useBookmark();
  if (isLoading) return <p>...loading</p>;
  return (
    <div>
      <h2>Bookmark List : ({bookmarks.length})</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <div
            key={item.id}
            className={`bookmarkItem ${
              item.id === currentBookmarks?.id ? "current-bookmark" : ""
            }`}
          >
            <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp; <strong>{item.cityName}</strong> &nbsp;
              <span>{item.country}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
