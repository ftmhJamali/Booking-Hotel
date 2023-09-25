import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination")
  );
  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 2,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDate, setShowDate] = useState(false);
  const handelOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const encoded = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encoded.toString(),
    });
  };

  const dateRef = useRef();
  //useOutSideClick(dateRef, "dateDropDown", () => setShowDate(false));
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            placeholder="where to go ?"
            type="text"
            value={destination}
            name="destination"
            onChange={(e) => setDestination(e.target.value)}
            id="destination"
            className="headerSearchInput"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div id="dateDropDown" onClick={() => setShowDate(!showDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {showDate && (
            <DateRange
              ref={dateRef}
              ranges={date}
              className="date"
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setShowOptions(!showOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {showOptions && (
            <GuestOptions
              setShowOptions={setShowOptions}
              options={options}
              handelOptions={handelOptions}
            />
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon " />
          </button>
        </div>
      </div>
      {isAuthenticated ? (
        <p>{user.name}</p>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};

export default Header;

function GuestOptions({ options, handelOptions, setShowOptions }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, "optionDropDown", () => setShowOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handelOptions={handelOptions}
        options={options}
        type="adult"
        minLimit={1}
      />
      <OptionItem
        handelOptions={handelOptions}
        options={options}
        type="children"
        minLimit={0}
      />
      <OptionItem
        handelOptions={handelOptions}
        options={options}
        type="room"
        minLimit={1}
      />
    </div>
  );
}
function OptionItem({ options, type, minLimit, handelOptions }) {
  return (
    <div className="guestOptionItem">
      <div className="optionText">{type}</div>
      <div className="optionCounter">
        <button
          onClick={() => handelOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span>{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handelOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
