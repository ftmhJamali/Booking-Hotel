import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../Context/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();
  const { currentHotel: data, getHotel, isLoadingCurrHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrHotel || !data) return <p>...loading</p>;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} &bull; {data.smart_location}
          <img src={data.xl_picture_url} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
