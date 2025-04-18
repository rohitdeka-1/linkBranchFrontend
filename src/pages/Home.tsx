import { motion } from "framer-motion";
import Logo from "./components/Logo";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
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
      <div className="min-h-screen flex flex-col justify-start items-start relative  text-white p-4 space-y-8 ">
        <div className="flex flex-col space-y-4 mt-20">
          <h2 className="font-extralight p-4 text-3xl w-9/12 leading-relaxed">
            Multiple Links for Your Link in Bio
          </h2>

          <p className="px-4 text-slate-300">
            Supercharge your portfolio, Share your links with others.
          </p>
        </div>

        <div className="flex flex-row px-4 space-x-7  w-full mt-10">
          <Link
            to="/login"
            className="bg-slate-200 h-14 text-black text-center flex justify-center px-4 py-2 w-1/2 rounded-2xl font-bold "
          >
            <button>Login</button>
          </Link>

          <Link
            to="/register"
            className="bg-slate-200 text-black text-center flex justify-center px-4 py-2 w-1/2 rounded-2xl font-bold "
          >
            <button>Register</button>
          </Link>
        </div>

        <div className="flex flex-row px-4 space-x-7 w-full mt-10">
          <img src="./coverPhoto.png"></img>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 w-full">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold w-full text-center">Features</h1>
            <p className="text-slate-300 py-6 text-justify">
              LinkBranch is a powerful tool that allows you to create a
              personalized and customizable page that houses all your important links.
              Whether you're a content creator, business owner, or just someone who
              wants to share their favorite links, LinkBranch has got you covered.
            </p>
          </div>

         

          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold  w-full text-center">Pricing</h1>
            <p className="text-slate-300 py-6 text-justify">
              LinkBranch offers flexible pricing plans to suit your needs. From a free
              plan with basic features to premium plans with advanced analytics and
              customization options, there's something for everyone.
            </p>
          </div>
        </div>
        <div className="flex flex-row px-4 w-full ">
          <img src="./cover2.png"></img>
        </div>
       <div className="w-full">

       <Footer/>
       </div>
        
      </div>
    </motion.div>
  );
};

export default Home;
