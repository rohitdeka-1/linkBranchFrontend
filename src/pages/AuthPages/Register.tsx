import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

const Register = () => {
  const backendURI = "/api/v1/auth/register";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    animation: "animate-slide-in" | "animate-slide-out";
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setNotification(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendURI, formData, {
        withCredentials: true,
      });

      console.log("Registered successfully:", res.data);

      // Show success notification
      setNotification({
        message: "Registered successfully!",
        type: "success",
        animation: "animate-slide-in",
      });

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        setNotification({
          message: "Registered successfully!",
          type: "success",
          animation: "animate-slide-out",
        });
        setTimeout(() => navigate("/dashboard"), 400); // Wait for slide-out animation to finish
      }, 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setNotification({
            message:
              "User already exists. Please try a different email or username.",
            type: "error",
            animation: "animate-slide-in",
          });
        } else if (err.response.status === 500) {
          setNotification({
            message: "Internal server error. Please try again later.",
            type: "error",
            animation: "animate-slide-in",
          });
        }
        else if (err.response.status === 422) {
          setNotification({
            message: "Password should be greater than 3 characters.",
            type: "error",
            animation: "animate-slide-in",
          });
        } else {
          setNotification({
            message: "An error occurred during registration. Please try again.",
            type: "error",
            animation: "animate-slide-in",
          });
        }
      } else {
        setNotification({
          message:
            "Unable to connect to the server. Please check your internet connection.",
          type: "error",
          animation: "animate-slide-in",
        });
      }
      console.error("Error during registration:", err);

      // Automatically clear the notification after 1.5 seconds
      setTimeout(() => {
        setNotification((prev) =>
          prev
            ? { ...prev, animation: "animate-slide-out" }
            : null
        );
      }, 1500);
    }
  };

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
      <div className="min-h-screen flex items-center justify-center relative flex-col pb-40">
        {notification && (
          <div
            className={`fixed top-[4.5rem] right-5 p-4 rounded text-white transition-transform transform ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } ${notification.animation}`}
          >
            {notification.message}
          </div>
        )}

        <Logo />

        <div className="p-8 w-96 rounded-lg">
          <h1 className="text-3xl text-center text-white font-bold mb-6">
            Register
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto text-white"
          >
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-2 w-full h-12 text-sm bg-slate-700 rounded-md border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="block py-2.5 px-2 w-full h-12 text-sm bg-slate-700 rounded-md border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="fullname"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Full Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="username"
                id="username"
                className="block py-2.5 px-2 w-full h-12 text-sm bg-slate-700 rounded-md border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Username
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-2 w-full h-12 text-sm bg-slate-700 rounded-md border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 h-12 mt-4 hover:bg-slate-800 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-white mt-3 text-sm">
            Already Registered?{" "}
            <Link to="/Login" className="text-blue-200">
              Login
            </Link>
          </p>
        </div>

        <div className="w-full h-10 mt-10">
          <Footer />
        </div>
      </div>
    </motion.div>
  );
};

export default Register;