import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookmarks, setCurrentBookmarks] = useState(null);
  const [isLoadingCurrBookmarks, setIsLoadinCurrBookmarks] = useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmarks(id) {
    setIsLoadinCurrBookmarks(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmarks(data);
      setIsLoadinCurrBookmarks(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrBookmarks(false);
    }
  }
  async function createBookmarks(newBookmark) {
    setIsLoadinCurrBookmarks(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      console.log(data);
      setCurrentBookmarks(data);
      setIsLoadinCurrBookmarks(false);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrBookmarks(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmarks,
        getBookmarks,
        isLoadingCurrBookmarks,
        createBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
