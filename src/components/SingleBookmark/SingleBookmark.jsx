import React, { useEffect } from "react";
import { useBookmark } from "../Context/BookmarkListProvider";
import { useParams } from "react-router-dom";

const SingleBookmark = () => {
  const { currentBookmarks, getBookmarks, isLoadingCurrBookmarks } =
    useBookmark();
  const { id } = useParams();
  useEffect(() => {
    getBookmarks(id);
  }, [id]);

  if (isLoadingCurrBookmarks || !currentBookmarks) return <p>...loading</p>;
  return <div>{currentBookmarks.cityName}</div>;
};

export default SingleBookmark;
