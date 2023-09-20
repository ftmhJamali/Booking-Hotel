import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";

const HotelsContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  //const adult = JSON.parse(searchParams.get("options"))?.adult;
  //const children = JSON.parse(searchParams.get("options"))?.children;
  //console.log(children);
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;
export function useHotels() {
  return useContext(HotelsContext);
}
