import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentBookmarks, setCurrentBookmarks] = useState(null);
  const initialState = {
    bookmarks: [],
    isLoading: false,
    currentBookmarks: null,
    error: null,
  };
  function bookmarkReducer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isLoading: true,
        };
      case "bookmarks/loaded":
        return {
          ...state,
          bookmarks: action.payload,
          isLoading: false,
        };
      case "bookmark/loaded":
        return {
          ...state,
          isLoading: false,
          currentBookmarks: action.payload,
        };
      case "bookmark/created":
        return {
          ...state,
          isLoading: false,
          bookmarks: [...state.bookmarks, action.payload],
          currentBookmarks: action.payload,
        };
      case "bookmark/deleted":
        return {
          ...state,
          isLoading: false,
          bookmarks: state.bookmarks.filter(
            (item) => item.id !== action.payload
          ),
          currentBookmarks: null,
        };
      case "rejected":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

      default:
        throw new Error("Unknown action");
    }
  }
  const [{ bookmarks, isLoading, currentBookmarks }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in fetching bookmarks",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmarks(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in fetching single bookmark",
      });
    }
  }
  async function createBookmarks(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      console.log(data);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in creating bookmark",
      });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });

    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "an Error occurred in removing bookmark",
      });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmarks,
        getBookmarks,
        createBookmarks,
        deleteBookmark,
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
