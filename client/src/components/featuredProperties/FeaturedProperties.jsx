import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels?featured=true`
  );

  return (
    <div className="w-full md:p-10 sm:px-5 p-0 flex flex-col gap-4">
      <div className="p-0 px-2 w-full text-gray-600">
        <h2 className="lg:text-2xl md:text-xl text-xl font-extrabold">
          Hotels guests love
        </h2>
        <p></p>
      </div>
      <div className="flex flex-row gap-5 rounded-lg overflow-x-auto card-scroll snap-x snap-mandatory p-2">
        {loading ? (
          "loading"
        ) : (
          <div className="flex flex-row gap-3">
            {data.map((item) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0 w-64 h-full"
                key={item._id}
              >
                <img
                  src={item.photos[0]}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="px-4 pt-2 pb-4 relative h-[calc(100%-192px)]">
                  <h3 className="text-lg font-bold text-gray-800 ">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm ">{item.city}</p>
                  <div className="flex items-center mb-5">
                    <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-1 font-bold rounded-full text-xs">
                      4.5
                    </button>
                    <span className="ml-2 text-gray-600 text-xs ">
                      Very Good, 500 reviews
                    </span>
                  </div>
                  <div>
                    <p className=" absolute bottom-2 right-4  text-gray-600 text-xs">
                      Starting from{" "}
                      <span className="text-gray-800 text-lg font-extrabold">
                        ${item.cheapPrice}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
