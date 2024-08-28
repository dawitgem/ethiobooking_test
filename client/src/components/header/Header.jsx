import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Search from "./components/Search";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stays from "./components/Stays";

const Header = ({ type }) => {
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

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const { user } = useContext(AuthContext);

  return (
    <div>
      {type === "list" ? (
        <>
          <Navbar />
          <div className="w-full p-0 m-0 relative flex flex-col bg-[#4C4556]">
            <Stays type="list" />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="w-full p-0 m-0 relative px-5 flex flex-col ">
            <Stays />
            <Hero />
            <Search />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
