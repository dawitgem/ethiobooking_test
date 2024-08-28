import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";

const Search = ({ type, dest }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div
      className={
        type === "list"
          ? "w-full md:px-20 px-5 flex justify-center align-middle border-b-primary "
          : "w-full md:px-20 px-5 flex justify-center align-middle "
      }
    >
      <div className="relative w-full   md:absolute md:top-[90%] md:w-[85%] p-2  search-radial  shadow-lg rounded-full">
        <div className="md:relative sm:static flex md:flex-row flex-col gap-3  p-0 ">
          <div className="flex items-center justify-center w-full border-2 border-transparent p-3 outline-none focus-within:border-primary search-box rounded-full bg-[white]">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder={type === "list" ? dest : "Where are you going?"}
              className="px-3 outline-none focus:outline-none" // Remove input's focus styles
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full border-2 border-transparent p-3 outline-none focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="px-3 text-gray-600 outline-none focus:outline-none"
            >
              <span className="text-gray-500">
                {format(dates[0].startDate, "MM/dd/yyyy")}
              </span>
              <span className="mx-2 text-purple-500">to</span>
              <span className="text-gray-500">
                {format(dates[0].endDate, "MM/dd/yyyy")}
              </span>
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date custom-date-range"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="flex items-center justify-center w-full border-2 border-transparent p-3 outline-none focus:border-b-primary search-box focus:border-2 rounded-full bg-[white]">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="px-3 text-gray-500"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className="options text-gray-500">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button
              className="md:disabled:opacity-50 disabled:cursor-not-allowed p-3 px-10 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
