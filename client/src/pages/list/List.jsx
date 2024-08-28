import "./list.css";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Footer from "../../components/footer/Footer";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);

  const [dates, setDates] = useState(
    location.state.dates || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels/?city=${destination}&min=${
      min || 0
    }&max=${max || 999}`
  );
  const {
    data: hotelData,
    loading: hotelLoading,
    error: hotelError,
  } = useFetch(
    `http://localhost:8800/api/hotels/countByCity?city=${destination}`
  );

  const [cityHotelCount, setCityHotelCount] = useState(null);
  const [newDestination, setNewDestination] = useState(destination);

  useEffect(() => {
    if (hotelData) {
      const hotelArray = Object.entries(hotelData).map(([key, value]) => [
        key,
        value,
      ]);
      setCityHotelCount(hotelArray);
    }
  }, [hotelData]);

  const handleClick = () => {
    setDestination(newDestination);
    reFetch();
  };

  const handleDestinationChange = (e) => {
    setNewDestination(e.target.value);
  };
  const handleDateChange = (item) => {
    setDates([item.selection]);
  };

  return (
    <div className="w-full h-screen p-0 m-0 relative flex flex-col ">
      <Header type="list" />
      <div className="">
        <div className="breadcrumbs flex items-center text-sm text-gray-600 m-2 px-10 py-3 ml-10">
          <a href="/" className="text-blue-500 hover:underline mr-2">
            Home
          </a>
          <span className="mx-2">&gt;</span>
          <a href="/" className="text-blue-500 hover:underline mr-2">
            Ethiopia
          </a>
          <span className="mx-2">&gt;</span>
          <a href="/hotels" className="text-blue-500 hover:underline mr-2">
            {destination}
          </a>
          <span className="mx-2">&gt;</span>
          <span>Search results</span>
        </div>
        <div className="listContainer px-28">
          <div className="listWrapper bg-[#f8f8f86e] p-5  pt-1 ">
            <div className="listSearch text-gray-600 rounded-lg shadow-lg p-5 bg-[white]">
              <h1 className="lg:text-2xl md:text-2xl text-xl font-extrabold">
                Search
              </h1>
              <div className="lsItem">
                <label>Destination</label>
                <div className="flex items-center justify-center w-full border-2 border-transparent p-2 outline-none focus:border-b-green-500  focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
                  <input
                    placeholder={destination}
                    type="text"
                    value={newDestination}
                    onChange={handleDestinationChange}
                    className="outline-none focus:outline-none"
                  />
                </div>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <div
                  onClick={() => setOpenDate(!openDate)}
                  className="flex items-center justify-center w-full border-2 border-transparent p-2 outline-none focus:border-b-primary search-box focus:border-2 rounded-full bg-[white] cursor-pointer"
                >
                  <span>
                    {dates[0].startDate && dates[0].endDate
                      ? `${format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`
                      : "Select dates"}
                  </span>
                </div>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    ranges={dates}
                    moveRangeOnFirstSelection={false}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <div className="flex items-center justify-center  border-2 border-transparent py-1 px-3 outline-none focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
                      <input
                        type="number"
                        onChange={(e) => setMin(e.target.value)}
                        className="lsOptionInput outline-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <div className="flex items-center justify-center  border-2 border-transparent py-1 px-3 outline-none focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
                      <input
                        type="number"
                        onChange={(e) => setMax(e.target.value)}
                        className="lsOptionInput outline-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <div className="flex items-center justify-center  border-2 border-transparent py-1 px-3 outline-none focus:border-b-primary focus-within:border-primary  search-box focus:border-2 rounded-full bg-[white]">
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput outline-none focus:outline-none"
                        placeholder={options.adult}
                      />
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <div className="flex items-center justify-center  border-2 border-transparent py-1 px-3 outline-none focus:border-b-primary  focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
                      <input
                        type="number"
                        min={0}
                        className="lsOptionInput outline-none focus:outline-none"
                        placeholder={options.children}
                      />
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <div className="flex items-center justify-center  border-2 border-transparent py-1 px-3 outline-none focus:border-b-primary focus-within:border-primary search-box focus:border-2 rounded-full bg-[white]">
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput outline-none focus:outline-none"
                        placeholder={options.room}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClick}
                className="md:disabled:opacity-50 disabled:cursor-not-allowed p-3 px-10 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white"
              >
                Search
              </button>
            </div>
            <div className="listResult bg-[white] p-5 rounded-lg shadow-lg">
              <div className="px-5 pb-3 text-gray-600">
                {" "}
                <h3 className="lg:text-2xl md:text-2xl text-xl font-extrabold">
                  {destination}
                </h3>
                <p>
                  {cityHotelCount?.map(([city, count]) => (
                    <p key={city}>{count} properties</p>
                  ))}
                </p>
              </div>
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} dest={destination} key={item._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full bg-[#4C4556] flex items-center justify-center p-3">
            <h1 className="lg:text-md md:text-md text-md font-extrabold text-white">
              Ethiobooking
            </h1>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default List;
