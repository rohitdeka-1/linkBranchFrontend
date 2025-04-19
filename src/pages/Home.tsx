import { motion } from "framer-motion";
import Logo from "./components/Logo";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
const Home = () => {
  return (
    <motion.div
      style={{
        backgroundImage: "linear-gradient(90deg, #000000, #1B263B)",
        backgroundSize: "200% 100%",
        backgroundPosition: "left center",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <Logo />
      <div className="min-h-screen flex flex-col justify-start items-start relative  text-white p-4 lg:px-36 space-y-8 ">
        {/* Top Text Section */}
        <div className="flex flex-col space-y-4 mt-20 w-full px-4 space lg:px-0">
          <h2 className="font-extralight text-3xl leading-relaxed w-full lg:w-3/5">
            Multiple Links for Your Link in Bio
          </h2>
          <p className="text-slate-300 w-full lg:w-3/5">
            Supercharge your portfolio, Share your links with others.
          </p>
        </div>

 
        <div className="flex flex-col md:flex-row px-4 mt-10 w-full space-y-6 md:space-y-0 md:space-x-6 lg:justify-center lg:w-[60rem] lg:items-center">
          {/* Left - Buttons */}
          <div className="flex flex-col w-full md:w-1/2 space-y-4">
            <Link
              to="/login"
              className="bg-slate-200 hover:bg-slate-400 h-14 text-black text-center flex justify-center items-center px-4 py-2 rounded-2xl font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-slate-200 hover:bg-slate-400 h-14 text-black text-center flex justify-center items-center px-4 py-2 rounded-2xl font-bold"
            >
              Register
            </Link>
          </div>

 
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src="./coverPhoto.png"
              className="w-full object-contain rounded-2xl"
              alt="cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 w-full">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold w-full text-center">Features</h1>
            <p className="text-slate-300 py-6 text-justify">
              LinkBranch is a powerful tool that allows you to create a
              personalized and customizable page that houses all your important
              links. Whether you're a content creator, business owner, or just
              someone who wants to share their favorite links, LinkBranch has
              got you covered.
            </p>
          </div>

          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold  w-full text-center">Pricing</h1>
            <p className="text-slate-300 py-6 text-justify">
              LinkBranch offers flexible pricing plans to suit your needs. From
              a free plan with basic features to premium plans with advanced
              analytics and customization options, there's something for
              everyone.
            </p>
          </div>
        </div>
        <div className="flex flex-row px-4 w-full ">
          <img src="./cover2.png"></img>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
