import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBus,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faPlaneCircleCheck,
  faRuler,
  faRulerCombined,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

const Hero = ({ type }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative w-full top-[-15px]">
      <div className="lg:px-17 md:px-14 py-20 p-5 text-white flex flex-col gap-1 ">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-extrabold">
          Find Your Ideal Stay with Ease{" "}
        </h1>
        <p className="md:text-l text-base font-semibold">
          Look for great deals on hotels, homes, and more.
        </p>
        <div className="mt-4">
          {!user && (
            <button className="bg-white hover:bg-[#4C4556] hover:text-white text-[#4C4556] font-bold py-2 px-4 rounded">
              Sign in / Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
