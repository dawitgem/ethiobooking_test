import "./mailList.css";

const MailList = () => {
  return (
    <div className="w-full md:p-0 sm:px-5 p-0 flex flex-col shadow-lg ">
      <div className="mail bg-mail h-[300px] pl-full mr-[-30px]">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-extrabold text-white">
          Save time, save money!
        </h1>
        <span className="lg:text-md md:text-md text-md font-extrabold text-white mt-[-20px]">
          Sign up and we'll send the best deals to you
        </span>
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            placeholder="Your Email"
            className="border-2 border-transparent p-3 outline-none focus:border-b-primary search-box focus:border-2 rounded-full bg-[white] w-[300px]"
          />
          <button className="md:disabled:opacity-50 disabled:cursor-not-allowed p-3 px-5 text-sm text-white font-medium bg-[#4C4556] rounded-full ring-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailList;
