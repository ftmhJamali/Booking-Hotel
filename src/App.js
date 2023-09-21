import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Headers/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/Context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Bookmark from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./components/Context/BookmarkListProvider";
function App() {
  return (
    <BookmarkProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<Bookmark />}>
            <Route index element={<p>bookmark list</p>} />
            <Route path="add" element={<p>add new bookmark</p>} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkProvider>
  );
}

export default App;
