import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const backendURI = "/api/v1/auth/register"; 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null); // State for notifications

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setNotification(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const res = await axios.post(backendURI, formData, { withCredentials: true });

      console.log("Registered successfully:", res.data);


      setNotification({ message: "Registered successfully!", type: "success" });


      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {

          setNotification({ message: "User already exists. Please try a different email or username.", type: "error" });
        } else if (err.response.status === 500) {

          setNotification({ message: "Internal server error. Please try again later.", type: "error" });
        } else {
          setNotification({ message: "An error occurred during registration. Please try again.", type: "error" });
        }
      } else {
        setNotification({ message: "Unable to connect to the server. Please check your internet connection.", type: "error" });
      }
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-700 via-slate-800 to-black min-h-screen flex items-center justify-center relative">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 p-4 rounded shadow-lg text-white transition-transform transform ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-slide-in-out`}
        >
          {notification.message}
        </div>
      )}

      <div className="shadow-xl p-8 w-96 rounded-lg">
        <h1 className="text-3xl text-center text-white font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto text-white">
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
            className="w-full bg-slate-600 h-12 hover:bg-slate-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;