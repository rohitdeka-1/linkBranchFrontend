import { motion } from "framer-motion";
import Logo from "./components/Logo";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <motion.div
      style={{
        backgroundImage: "linear-gradient(90deg, #000000, #1B263B)", // dark to bright (left to right)
        backgroundSize: "200% 100%",
        backgroundPosition: "left center",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // shift from left to right and back
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <Logo />
      <div className="min-h-screen flex flex-col justify-start items-start relative pb-40 text-white p-4 space-y-6">
        <div className="flex flex-col space-y-4 mt-20">
          <h2 className="font-extralight p-4 text-3xl w-9/12 leading-relaxed">
            Multiple Links for Your Link in Bio
          </h2>

          <p className="px-4 text-slate-300">
            Supercharge your portfolio, Share your links with others.
          </p>
        </div>

        <div className="flex flex-row px-4 space-x-7  w-full mt-10">
          <button className="bg-slate-200 text-black px-4 py-2 w-1/2 h-14 rounded-2xl font-bold">
            <Link to="/login">Login</Link>
          </button>
          <button className="bg-slate-200 text-black px-4 py-2 w-1/2 rounded-2xl font-bold ">
          <Link to="/register">Register</Link>
          </button>
        </div>

        <div className="flex flex-row px-4 space-x-7 w-full mt-10">
          <img src="./coverPhoto.png"></img>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
