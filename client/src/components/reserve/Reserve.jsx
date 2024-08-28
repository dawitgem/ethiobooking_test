import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: allDates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-6 py-4">
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">Select your rooms</h2>
              {data && data.length > 0 ? (
                <div className="space-y-6">
                  {data.map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-gray-600">{item.desc}</p>
                          <p className="text-gray-600">
                            Max people:{" "}
                            <span className="font-bold">{item.maxPeople}</span>
                          </p>
                          <p className="text-gray-600 font-bold">
                            {item.price}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {item.roomNumbers.map((roomNumber, roomIndex) => (
                            <div key={roomIndex} className="flex items-center">
                              <label htmlFor="" className="text-gray-600 mr-2">
                                {roomNumber.number}
                              </label>
                              <input
                                type="checkbox"
                                value={roomNumber._id}
                                onChange={handleSelect}
                                className="form-checkbox text-indigo-600 h-5 w-5"
                                disabled={!isAvailable(roomNumber)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  No rooms available
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleClick}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
