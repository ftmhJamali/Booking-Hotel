import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [currentBookmarks, setCurrentBookmarks] = useState(null);
  const [isLoadingCurrBookmarks, setIsLoadinCurrBookmarks] = useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

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

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmarks,
        getBookmarks,
        isLoadingCurrBookmarks,
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
