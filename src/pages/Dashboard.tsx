import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  fullname: string;
  username: string;
  email: string;
  bio: string | null;
  profilePic: string | null;
  links: Array<{
    _id: string;
    title: string;
    url: string;
    icon: string;
    order: number;
  }>;
};

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const [newLink, setNewLink] = useState({
    title: "",
    platform: "",
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err: unknown) {
        if (isAxiosError(err) && err.response) {
          if (err.response.status === 401) {
            setError("You are not logged in or your session expired.");
          } else if (err.response.status === 500) {
            setError("Internal server error. Please try again later.");
          } else {
            setError("An error occurred. Please try again.");
          }
        } else {
          console.error("Not authenticated", err);
          setError("You are not logged in or your session expired.");
        }
      }
    };
    fetchMe();
  }, []);

  const image_URI = `${
    import.meta.env.VITE_BACKEND_URI
  }/api/v1/user/upload-image`;

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    setUploading(true); 

    try {
      const res = await axios.post(image_URI, formData, {
        withCredentials: true,
      });

      setUser((prevUser) => {
        if (!prevUser) return null;
        return { ...prevUser, profilePic: res.data.image };
      });
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink({ ...newLink, [e.target.id]: e.target.value });
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Link submitted:", newLink);

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user`,
        {
          platform: newLink.title,
          url: newLink.platform,
        },
        { withCredentials: true }
      );

      setNewLink({ title: "", platform: "" });
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error adding link:", err);
}
  };
  const handleLogout = async () => { 
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/auth/logout`,
        { withCredentials: true }
      );
      setUser(null);  
      setError(null);  
      window.location.href = "/login";  
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <div className="relative">
      {/* Blur background and show loading indicator when uploading */}

      <div className="bg-gradient-to-b from-[#2b2a2a] to-black min-h-screen text-white p-5">
        <h1 className="text-3xl text-center mb-4 font-bold">Dashboard</h1>

        {error ? (
          <p className="text-red-400 slide-in">{error}</p>
        ) : user ? (
          <div className="space-y-2">
            {/* Profile Photo Section */}
            <div className="relative flex flex-col items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <button
                  onClick={handleUploadImage}
                  className="rounded-full w-24 h-24 overflow-hidden relative"
                >
                  {user.profilePic ? (
                    <>
                      {uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-full">
                          <div className="text-white text-sm animate-pulse">
                            Uploading...
                          </div>
                        </div>
                      )}
                      <img
                        src={user.profilePic}
                        alt="Profile"
                        className={`rounded-full w-full h-full border-2 border-white object-cover transition-all ${
                          uploading ? "blur-sm" : ""
                        }`}
                      />
                    </>
                  ) : (
                    <div
                      className={`rounded-full hover:bg-red-300 w-full h-full bg-gray-700 flex items-center justify-center text-xl ${
                        uploading ? "blur-sm" : ""
                      }`}
                    >
                      {user.fullname?.charAt(0)}
                    </div>
                  )}
                </button>
              </div>
              <span className="text-center text-sm w-full mt-2">
                Upload Image
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              id="profilePic"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <p className="text-center text-xl">
              <strong>{user.fullname}</strong>
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.links.map((link) => (
                  <motion.a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-cyan-400 transition-all duration-200 shadow-md hover:shadow-cyan-700/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-cyan-600 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-xl">
                        {link.title.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{link.title}</h3>
                        <p className="text-sm text-gray-400">{link.url}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="font-bold text-md flex items-center justify-center fixed w-full bottom-0 left-0 right-0 py-6 border-cyan-400">
        <span className="flex flex-row space-x-5 items-center justify-evenly mb-4 border w-3/4 py-2 rounded-3xl">
          <button>
            <span className="text-2xl w-full">
              <FontAwesomeIcon
                icon={faSquarePlus}
                style={{ color: "#ffffff" }}
              />
            </span>
          </button>

          <button onClick={() => setIsFormOpen(true)}>
            <span className="text-2xl w-full">
              <FontAwesomeIcon
                icon={faSquarePlus}
                style={{ color: "#ffffff" }}
              />
            </span>
          </button>

          <button onClick={handleLogout}>
            <span className="text-2xl w-full">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ color: "#ffffff" }}
              />
            </span>
          </button>
        </span>
      </div>

      {/* Add Link Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white z-50 rounded-t-3xl p-6 shadow-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            onDragEnd={(_, info) => {
              if (info.point.y > 100) setIsFormOpen(false);
            }}
          >
            <div className="w-full text-center border-b border-gray-500 pb-3 mb-4">
              <div className="w-12 h-1 rounded-full bg-gray-500 mx-auto"></div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Add New Link</h2>

            <form className="space-y-4" onSubmit={handleAddLink}>
              <div>
                <label htmlFor="title" className="block mb-1">
                  Link Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="platform"
                  value={newLink.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  placeholder="Enter Title (e.g., Instagram)"
                  required
                />
              </div>

              <div>
                <label htmlFor="platform" className="block mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="platform"
                  value={newLink.platform}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  placeholder="Enter URL"
                  required
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 px-4 py-2 rounded font-semibold"
                >
                  Add Link
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
