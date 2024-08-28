import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div className="w-full h-screen p-0 m-0 relative flex flex-col ">
      <div className="w-full bg-radial h-3/4">
        {/* <Navbar /> */}
        <Header />
      </div>
      <div className="w-full flex flex-col gap-1 md:py-16 md:px-24 px-8">
        <Featured />
        <PropertyList />
        <FeaturedProperties />
        <MailList />
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
  );
};

export default Home;
