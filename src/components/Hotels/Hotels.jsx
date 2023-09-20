import React from "react";
import { Link } from "react-router-dom";
import { useHotels } from "../Context/HotelsProvider";

const Hotels = () => {
  const { isLoading, hotels } = useHotels();
  if (isLoading) return <div>...loading</div>;
  return (
    <div className="searchList">
      <h2>Search Results : ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div className="searchItem">
            <img src={item.picture_url.url} alt="" />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Hotels;
