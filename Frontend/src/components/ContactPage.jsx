import React from "react";
import img1 from "../assets/img1.jpg"; // Import images for each person
import img2 from "../assets/img2.jpg"; // Import images for each person
import img3 from "../assets/img3.jpg"; // Import images for each person
import img4 from "../assets/img4.jpg"; // Import images for each person

const ContactPage = () => {
  React.useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount

  return (
    <>
      <div className=" min-h-screen flex justify-center items-center">
        <div className="container mx-auto flex flex-wrap justify-center gap-5">

            {/* card 1 */}
          <div className="w-[23%] max-w-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 mt-10 rounded-full shadow-lg"
                src={img1}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              PRIYANK DALWADI
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Email : d23dit101@charusat.edu.in
              </span>
              <div className="flex mt-4 md:mt-6"></div>
            </div>
          </div>
          <div className="w-[23%] max-w-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 mt-10 rounded-full shadow-lg"
                src={img3}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                JENI PATEL
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
               Email : d23dit107@charusat.edu.in
              </span>
              <div className="flex mt-4 md:mt-6"></div>
            </div>
          </div>
          <div className="w-[23%] max-w-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 mt-10 rounded-full shadow-lg"
                src={img2}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              HET SHAH
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Email : d23dit104@charusat.edu.in
              </span>
              <div className="flex mt-4 md:mt-6"></div>
            </div>
          </div>
          <div className="w-[23%] max-w-[100%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 mt-10 rounded-full shadow-lg"
                src={img4}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
               AYUSH VERMA
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
               Email : d23dit109@charusat.edu.in
              </span>
              <div className="flex mt-4 md:mt-6"></div>
            </div>
          </div>
          

        </div>
      </div>
    </>
  );
};

export default ContactPage;
