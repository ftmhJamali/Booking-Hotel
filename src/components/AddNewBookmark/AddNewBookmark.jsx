import React, { useEffect, useState } from "react";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkListProvider";

const BASE_GEO_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const AddNewBookmark = () => {
  const [loading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, lng] = useUrlLocation();
  const [countryCode, setCountryCode] = useState("");
  const [geoError, setGeoError] = useState(null);
  const { createBookmarks } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchGeoLoaction() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `${BASE_GEO_URL}?latitude=${lat}&longitude=${lng}`
        );
        setCity(data.city);
        if (!data.countryCode) {
          throw new Error("please select someWhere else!!!");
        }
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        //console.log(data);
      } catch (error) {
        setGeoError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGeoLoaction();
  }, [lat, lng]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !country) return;
    const newBookmark = {
      city,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: city + " " + country,
    };
    await createBookmarks(newBookmark);
    navigate("/bookmark")
  };
  if (loading) return <p>...loading</p>;
  if (geoError) return <p>{geoError}</p>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City Name"
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
