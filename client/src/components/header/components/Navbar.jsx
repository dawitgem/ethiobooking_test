import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../../assets/Eblogo2.svg";
import logo2 from "../../../assets/Eblogo3.svg";

const Navbar = ({ type }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={
        type !== "list"
          ? "w-full md:px-20 px-5 py-3  flex justify-between bg-[#4C4556]"
          : "w-full md:px-20 px-5 py-3  flex justify-between "
      }
    >
      <div className="self-center md:w-[240px] w-[50px] md:h-full">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="hidden md:block w-full h-full "
          />
          <img src={logo2} alt="logo" className="md:hidden  w-full h-full " />
        </Link>
      </div>
      {user ? (
        user.username
      ) : (
        <div className="navItems gap-3">
          <button className="md:disabled:opacity-50 hover:bg-white hover:text-[#4C4556] disabled:cursor-not-allowed p-3 px-10 mr-2 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
            Register
          </button>
          <button className="md:disabled:opacity-50 hover:bg-[#4C4556] hover:text-white disabled:cursor-not-allowed p-3 px-10 text-sm text-[#4C4556]  font-medium bg-white rounded-full ring-white">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
