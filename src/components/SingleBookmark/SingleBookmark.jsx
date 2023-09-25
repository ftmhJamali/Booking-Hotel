import React, { useEffect } from "react";
import { useBookmark } from "../Context/BookmarkListProvider";
import { useParams } from "react-router-dom";

const SingleBookmark = () => {
  const { currentBookmarks, getBookmarks, isLoading } =
    useBookmark();
  const { id } = useParams();
  useEffect(() => {
    getBookmarks(id);
  }, [id]);

  if (isLoading || !currentBookmarks) return <p>...loading</p>;
  return <div>{currentBookmarks.cityName}</div>;
};

export default SingleBookmark;
