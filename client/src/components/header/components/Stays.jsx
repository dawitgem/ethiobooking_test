import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBuilding,
  faBus,
  faCalendarDays,
  faCar,
  faHome,
  faHotel,
  faHouse,
  faHouseFloodWaterCircleArrowRight,
  faPerson,
  faPlane,
  faPlaneCircleCheck,
  faRuler,
  faRulerCombined,
  faTaxi,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

const Stays = ({ type }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={type === "list" && "mt-[-20px]"}>
      <div className="w-full md:px-20 px-5 py-3 flex gap-1">
        <div className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed py-5 px-5 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
          <FontAwesomeIcon icon={faHotel} className="pr-3" />
          <span>Hotels</span>
        </div>
        <div className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed py-5 px-5 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
          <FontAwesomeIcon icon={faUmbrellaBeach} className="pr-3" />
          <span>Resorts</span>
        </div>
        <div className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed py-5 px-5 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
          <FontAwesomeIcon icon={faHouse} className="pr-3" />
          <span>Villas</span>
        </div>
        <div className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed py-5 px-5 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
          <FontAwesomeIcon icon={faBuilding} className="pr-3" />
          <span>Apartements</span>
        </div>
        <div className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed py-5 px-5 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
          <FontAwesomeIcon
            icon={faHouseFloodWaterCircleArrowRight}
            className="pr-3"
          />
          <span>Cabins</span>
        </div>
      </div>
    </div>
  );
};

export default Stays;
