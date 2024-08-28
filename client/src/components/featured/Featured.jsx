import "./featured.css";
import useFetch from "../../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBus,
  faCalendarDays,
  faPerson,
  faPlane,
  faPlaneCircleCheck,
  faRuler,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  const {
    data: cityData,
    loading: cityLoading,
    error: cityError,
  } = useFetch("http://localhost:8800/api/city/city");

  const [activeImage, setActiveImage] = useState("");
  const [activeDescription, setActiveDescription] = useState("");
  const [activeName, setActiveName] = useState("");
  const [activeDistance, setActiveDistance] = useState("");

  useEffect(() => {
    if (cityData && cityData.length > 0) {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const imageUrl = proxyUrl + cityData[0].images[0];

      setActiveImage(cityData[0].images[0]);
      setActiveDistance(cityData[0].distance);
      setActiveDescription(cityData[0].description);
      setActiveName(cityData[0].name);
    }

    // if (hotelData) {
    //   setCityHotelCount(hotelData);
    // }
  }, [cityData]);

  const handleImageHover = (imageUrl, description, name, distance) => {
    setActiveImage(imageUrl);
    setActiveDescription(description);
    setActiveDistance(distance);
    setActiveName(name);
  };

  return (
    <div className="w-full md:p-10 sm:px-5 p-0 flex flex-col gap-4">
      <div className="p-2 px-2 w-full text-gray-600">
        <h2 className="lg:text-4xl md:text-2xl text-xl font-extrabold">
          Trending destinations
        </h2>
        <p>Explore stays in trending destinations</p>
      </div>
      {cityLoading ? (
        "Loading please wait"
      ) : cityError ? (
        <div>Error: {cityError.message}</div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div class="flex flex-row justify-between items-center w-full">
              <div className="w-full relative h-[400px] shadow-lg flex flex-row-reverse">
                <div className="absolute w-full h-full top-10 left-10 ">
                  <div className="px-10 pt-10 pb-2 bg-gradient-to-r from-[#4C4556] to-[#4C45567a] w-[40%] shadow-xl h-[75%] gap-2">
                    <div>
                      <h1 className="text-[white] text-3xl font-extrabold">
                        {activeName}
                      </h1>
                      <p className="text-[white] text-lg font-extrabold">
                        10 properties
                      </p>
                      <p className="text-[14px] text-[white] text-justify">
                        {activeDescription}
                      </p>
                    </div>
                    <div className="py-5 bg-[#4C4556a6] flex flex-row gap-3 px-3">
                      <div>
                        <p className="text-[14px] text-[white] text-xs">
                          <FontAwesomeIcon icon={faRuler} className="pr-1" />{" "}
                          Distance: <span>{activeDistance}</span> from A.A
                        </p>
                        <p className="text-[14px] text-[white] text-xs py-1">
                          <FontAwesomeIcon icon={faPlane} className="pr-1" />{" "}
                          Flight: Available
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] text-[white] text-xs ">
                          <FontAwesomeIcon icon={faBed} className="pr-1" />
                          Stays Available
                        </p>
                        <p className="text-[14px] text-[white] text-xs py-1">
                          <FontAwesomeIcon icon={faBus} className="pr-1" />{" "}
                          Transportation Available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={activeImage}
                  alt=""
                  className="w-[75%] h-full object-cover top-5"
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 overflow-x-auto card-scroll snap-x snap-mandatory">
              {cityData?.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[200px] h-[150px] relative flex-shrink-0 cursor-pointer rounded-2xl shadow-lg"
                  onMouseEnter={() =>
                    handleImageHover(
                      item.images[0],
                      item.description,
                      item.name,
                      item.distance
                    )
                  }
                >
                  <img
                    src={item.images[0]} // Display the first image in the array
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-[#36013670] p-2 text-white text-center font-bold rounded-xl">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
