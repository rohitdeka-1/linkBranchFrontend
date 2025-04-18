import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="w-full fixed z-[100] backdrop-blur-sm top-0 h-14 left-0  flex justify-between px-6 xl:px-40 items-center border-b py-2 border-gray-500 ">
      <div className="w-full flex  items-center space-x-2">
        <img src="./logo1.png" className=" h-5 " />
        <h1 className="text-white text-xl font-bold">
          <Link to="/">LinkBranch</Link>
        </h1>
      </div>
      <div className=" flex justify-center w-1/3  items-center space-x-2 text-white">
        <a
          href="https://www.rohitdeka.me"
          target="_blank"
          className="relative inline-block px-4 py-2 text-white font-medium rounded-md overflow-hidden group"
        > <span className="absolute inset-0 bg-gradient-to-r from-slate-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-sm animate-gradient-x transition-opacity duration-500"></span>
        <span className="relative z-10">Developer</span>
      </a>
      </div>
    </div>
  );
};

export default Logo;
