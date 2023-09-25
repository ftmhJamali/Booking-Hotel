import React from "react";
import { useBookmark } from "../Context/BookmarkListProvider";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmarks, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log(id);
    await deleteBookmark(id);
  };

  if (isLoading) return <p>...loading</p>;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;
  return (
    <div>
      <h2>BookmarkList</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmarks?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.city}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
