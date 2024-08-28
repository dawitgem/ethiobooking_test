import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`
  );
  const { dates, options } = useContext(SearchContext);
  const MILLISEONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISEONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i, imageUrl) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header type="list" />
      <div className="breadcrumbs flex items-center text-sm text-gray-600 m-2 px-10 py-3 ml-10">
        <a href="/" className="text-blue-500 hover:underline mr-2">
          Home
        </a>
        <span className="mx-2">&gt;</span>
        <a href="/" className="text-blue-500 hover:underline mr-2">
          Ethiopia
        </a>
        <span className="mx-2">&gt;</span>
        <span
          href=""
          onClick={handleBackClick}
          className="text-blue-500 hover:underline mr-2"
        >
          {data.city}
        </span>
        <span className="mx-2">&gt;</span>
        <span className="hover:underline mr-2 text-[#716188]">{data.name}</span>
        <span className="mx-2">&gt;</span>
        <span>Search results</span>
      </div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper gap-5 rounded-lg shadow-lg p-5 bg-[white]">
            {/* <button className="bookNow">Reserve or Book Now!</button> */}
            <div>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapPrice}at this property and get a
                free airport taxi
              </span>
              <div className="hotelImages  w-full">
                <div className="grid grid-rows-[1fr_1fr] gap-1 w-full ">
                  {/* First Row */}
                  <div className="grid grid-cols-[2fr_1fr] gap-1 w-full ">
                    <div className="relative h-68">
                      {data.photos && data.photos[0] && (
                        <img
                          onClick={() => handleOpen(0)}
                          src={data.photos[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="grid grid-rows-[1fr_1fr] gap-1">
                      {data.photos?.slice(1, 3).map((photo, i) => (
                        <div key={i} className="relative h-48">
                          {photo && (
                            <img
                              onClick={() => handleOpen(i)}
                              src={photo}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-1">
                    {data.photos && // Check if data.photos exists before slicing
                      data.photos.slice(3, 7).map((photo, i) => (
                        <div key={i} className="relative h-36">
                          {photo && i === 3 && data.photos.length > 7 && (
                            <div
                              className="absolute inset-0 bg-[#bdbcbc71] flex items-center justify-center text-white font-bold text-lg cursor-pointer"
                              onClick={() => handleOpen(6)}
                            >
                              + {data.photos.length - 7} Photos
                            </div>
                          )}
                          {photo && (
                            <img
                              onClick={() => handleOpen(i + 3)}
                              src={photo}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}

                    {/* Fill remaining slots with empty divs ONLY if less than 7 photos */}
                    {data.photos &&
                      data.photos.length < 7 &&
                      Array.from({ length: 7 - data.photos.length }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className="relative h-24 bg-gray-300"
                          ></div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-cols gap-2">
              {" "}
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data?.cheapPrice * options.room}</b> ({days}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
