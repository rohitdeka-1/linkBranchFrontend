import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faSquarePlus,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoader from "./components/Dashboard/Loader";

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
    backgroundImage: string;
  }>;
};

const randomImage = [
  "https://res.cloudinary.com/doejdsmym/image/upload/v1745083949/ran3_atzbov.gif",
  "https://res.cloudinary.com/doejdsmym/image/upload/v1745083944/ran4_vm8qgc.jpg",
  "https://res.cloudinary.com/doejdsmym/image/upload/v1745086042/astra_tsa2ff.gif",
  "https://res.cloudinary.com/doejdsmym/image/upload/v1745086883/neon_a7ok58.gif",
  "https://res.cloudinary.com/doejdsmym/image/upload/v1745085092/1203d8dbd23787123dc714de1c07df09_j9ivav.gif",
];

const randomIndex = Math.floor(Math.random() * randomImage.length);
console.log(randomIndex);

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [newLink, setNewLink] = useState({
    title: "",
    platform: "",
  });

  const [selectedLink, setSelectedLink] = useState<{
    _id: string;
    title: string;
    url: string;
    icon: string;
    order: number;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [updatingLinkId, setUpdatingLinkId] = useState<string | null>(null);

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
  useEffect(() => {
    console.log("BGINDEX", bgIndex);
  }, [bgIndex]);

  useEffect(() => {
    fetchMe();
  }, []);

  const image_URI = `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/user-up`;

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
      const res = await axios.put(image_URI, formData, {
        withCredentials: true,
      });

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          profilePic: `${res.data.user.profilePic}?t=${new Date().getTime()}`,
        };
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/links`,
        {
          platform: newLink.title,
          url: newLink.platform,
        },
        { withCredentials: true }
      );
      const updatedUser = res.data.user;

      setUser(updatedUser);

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
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Error logging out. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!selectedLink) return;

    // Set the updating state for this specific link
    setUpdatingLinkId(selectedLink._id);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/links/${selectedLink._id}`,
        {
          title,
          url,
          backgroundImage: randomImage[bgIndex],
        },
        { withCredentials: true }
      );

      // Instead of directly setting the user state, update it while preserving the existing state
      // setUser((prevUser) => {
      //   if (!prevUser) return prevUser

      //   // Create a new user object with updated links
      //   console.log("Updated user data:", res.data.user)
      //   return {
      //     ...prevUser,
      //     links: res.data.user.links || prevUser.links,
      //   }
      // })
      console.log("Updated user data:", res.data.user);
      const updatedUser = res.data.user;
      setUser(updatedUser); // Update the user state

      fetchMe();

      setSelectedLink(null);
    } catch (err) {
      console.error("Error updating link:", err);
    } finally {
      // Clear the updating state
      setUpdatingLinkId(null);
    }
  };

  return (
    <div className="relative font-thin">
      <div className="bg-gradient-to-b from-[#1c1c2b] via-[#0d0d1f] to-[#000000] min-h-screen text-white p-5">
        <div className="heading">
          <h1 className="text-sm text-white font-thin text-center mb-3">
            LinkBranch
          </h1>
        </div>
        {error ? (
          <p className="text-red-400 slide-in">{error}</p>
        ) : user ? (
          <div className="space-y-2">
            <div className="bg-black/50 rounded-xl p-4 mb-6">
            
              <div className="relative flex flex-col items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <button
                    onClick={handleUploadImage}
                    className="rounded-full w-24 h-24 overflow-hidden relative"
                  >
                    {uploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-full">
                        <div className="text-white text-sm animate-pulse">
                          Uploading...
                        </div>
                      </div>
                    )}
                    {user.profilePic ? (
                      <img
                        src={user.profilePic || "/placeholder.svg"}
                        alt="Profile"
                        className={`rounded-full w-full h-full border-2 border-white object-cover transition-all ${
                          uploading ? "blur-sm" : ""
                        }`}
                      />
                    ) : (
                      <div
                        className={`rounded-full hover:bg-slate-600 w-full h-full bg-gray-700 flex items-center justify-center text-xl ${
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

              <p className="text-center font-bold text-xl">
                <strong>{user.fullname}</strong>
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              name="profilePic"
              id="profilePic"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />


            <div className="relative mt-6">
              <div className="grid grid-cols-2 mt-5 sm:grid-cols-2 lg:grid-cols-2 gap-3 auto-rows-fr">
                {user.links.slice(0, 6).map((link, index) => (
                  <motion.div
                    key={link._id}
                    onClick={() => {
                      setSelectedLink(link);
                      setTitle(link.title);
                      setUrl(link.url);
                      setBgIndex(
                        randomImage.findIndex(
                          (img) =>
                            img === randomImage[index % randomImage.length]
                        ) || 0
                      );
                    }}
                    whileHover={{
                      scale: 0.98,
                      rotate: -1,
                      x: -2,
                      y: -2,
                      transition: {
                        type: "tween",
                        stiffness: 200,
                        duration: 0.15,
                        damping: 2,
                      },
                    }}
                    whileTap={{
                      scale: 0.98,
                      rotate: -1,
                      x: -2,
                      y: -2,
                      transition: {
                        type: "tween",
                        stiffness: 200,
                        duration: 0.1,
                        damping: 15,
                      },
                    }}
                    className={`cursor-pointer relative block rounded-xl border border-gray-700 hover:border-cyan-400 transition-all duration-200 shadow-md hover:shadow-cyan-700/30 bg-cover bg-center ${
                      updatingLinkId === link._id ? "pointer-events-none" : ""
                    }`}
                    style={{
                      backgroundImage: `url(${
                        link.backgroundImage ||
                        randomImage[index % randomImage.length]
                      })`,
                      transformOrigin: "left bottom",
                    }}
                  >
                    <div
                      className={`h-40 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-[1.3px] ${
                        updatingLinkId === link._id ? "blur-sm" : ""
                      }`}
                    >
                      {updatingLinkId === link._id && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="text-white text-sm animate-pulse">
                            Updating...
                          </div>
                        </div>
                      )}
                      <h3 className="text-lg text-white text-center font-semibold w-full px-4 py-2">
                        {link.title.toUpperCase()}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {selectedLink && (
              <div
                className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 ${
                  updatingLinkId === selectedLink._id ? "blur-sm" : ""
                }`}
              >
                <div className="bg-[#1f1f1f] rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
                  {updatingLinkId === selectedLink._id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-xl">
                      <div className="text-white text-sm animate-pulse">
                        Saving...
                      </div>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-white mb-4">
                    Edit Link
                  </h2>
                  <label className="block mb-2 text-white">Title</label>
                  <input
                    className="w-full px-3 py-2 rounded bg-zinc-800 text-white mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="block mb-2 text-white">URL</label>
                  <input
                    className="w-full px-3 py-2 rounded bg-zinc-800 text-white mb-4"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <label className="block mb-2 text-white">
                    Card Background
                  </label>
                  <div className="flex gap-2 overflow-x-auto mb-4">
                    {randomImage.map((img, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-lg cursor-pointer bg-cover bg-center border-2 ${
                          i === bgIndex
                            ? "border-cyan-400"
                            : "border-transparent"
                        }`}
                        style={{ backgroundImage: `url(${img})` }}
                        onClick={() => setBgIndex(i)}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 rounded bg-red-500 text-white"
                      onClick={() => setSelectedLink(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-cyan-600 text-white"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SkeletonLoader />
        )}
      </div>

      <div className="font-bold text-md flex items-center justify-center fixed w-full bottom-0 left-0 right-0 py-1 border-cyan-400">
        <span className="flex flex-row space-x-5 items-center justify-evenly mb-4 border w-3/4 py-2 rounded-3xl">
          <button>
            <span className="text-2xl w-full">
              <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />
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
              if (info.offset.y > 50) setIsFormOpen(false);
            }}
          >
            <div className="w-full text-center border-b border-gray-500 pb-3 mb-4">
              <div className="w-12 h-1 rounded-full bg-gray-500 mx-auto"></div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Add New Link</h2>

            <form className="space-y-10 " onSubmit={handleAddLink}>
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
