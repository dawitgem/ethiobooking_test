import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SearchItem = ({ item, dest }) => {
  return (
    <div className="searchItem">
      <img src={item.photos} alt="" className="siImg rounded-lg" />
      <div className="siDesc">
        <h1 className="siTitle font-bold">{item.name}</h1>
        <span className="siDistance flex items-center ">
          <a
            href="/hotels"
            className="text-blue-500 hover:underline mr-2 font-bold underline"
          >
            {" "}
            {dest},
          </a>
          {item.distance}km from downtown
        </span>

        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <div className="flex flex-col gap-2 border-l-2 border-gray-200">
          <span className="siCancelOp px-3 text-[#716188]">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-3 h-3 mr-2 text-[#716188]"
              />
              <span>Free cancellation</span>
            </div>
          </span>
          <span className="siCancelOpSubtitle px-8 mt-[-5px] text-[#716188]">
            {" "}
            You can cancel later, so lock in this great price today!
          </span>
          <span className="siCancelOp px-3 text-[#716188]">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="w-3 h-3 mr-2" />
              <span>
                No prepayment needed{" "}
                <span className="siCancelOpSubtitle text-[#716188]">
                  – pay at the property
                </span>
              </span>
            </div>
          </span>
          <div className="px-8">
            <button className="siTaxiOp px-2 py-2 rounded-full border-2 border-[#716188] bg-white text-[#716188]">
              Free airport taxi
            </button>
          </div>
        </div>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating ">
            <span>
              {" "}
              {item.rating >= 4.5
                ? "Excellent"
                : item.rating >= 3.5
                ? "Very Good"
                : item.rating >= 2.5
                ? "Average"
                : item.rating >= 2
                ? "Below Average"
                : "Poor"}
            </span>
            <button
              className={`px-2 py-1 rounded-md ${
                item.rating >= 4.5
                  ? "bg-green-500 text-white"
                  : item.rating >= 3.5
                  ? "bg-yellow-500 text-white"
                  : item.rating >= 2.5
                  ? "bg-orange-500 text-white"
                  : item.rating >= 2
                  ? "bg-red-500 text-white"
                  : "bg-red-700 text-white"
              }`}
            >
              {item.rating}
            </button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">
              See availability <span className="mx-2">&gt;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
