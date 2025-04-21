import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { motion } from "framer-motion";
import SkeletonLoader from "./components/Dashboard/Loader";

type User = {
  fullname: string;
  username: string;
  profilePic: string | null;
  links: Array<{
    _id: string;
    title: string;
    url: string;
    backgroundImage: string;
  }>;
};

const Public = () => {
  const { username } = useParams<{ username: string }>(); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/user/${username}`);
        setUser(res.data.user);
        setError(null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("User not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-400 text-center mt-10">{error}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-[#1c1c2b] via-[#0d0d1f] to-[#000000] min-h-screen text-white p-5">
      <div className="heading">
        <h1 className="text-sm text-white font-thin text-center mb-3">
          {user?.fullname}'s Profile
        </h1>
      </div>
      <div className="space-y-2">
        <div className="bg-black/50 rounded-xl p-4 mb-6">
          <div className="relative flex flex-col items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <div className="rounded-full w-24 h-24 overflow-hidden relative">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <div className="rounded-full w-full h-full bg-gray-700 flex items-center justify-center text-xl">
                    {user?.fullname?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <span className="text-center text-sm w-full mt-2">
              @{user?.username}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 sm:grid-cols-2 lg:grid-cols-2 gap-3 auto-rows-fr">
          {user?.links.map((link, index) => (
            <motion.div
              key={link._id}
              onClick={() => window.open(link.url, "_blank")} // Redirect to link
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
              className="cursor-pointer relative block rounded-xl border border-gray-700 hover:border-cyan-400 transition-all duration-200 shadow-md hover:shadow-cyan-700/30 bg-cover bg-center"
              style={{
                backgroundImage: `url(${link.backgroundImage})`,
                transformOrigin: "left bottom",
              }}
            >
              <div className="h-40 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-[1.3px]">
                <h3 className="text-md rounded-md text-white text-center font-thin w-full px-4 py-2">
                  {link.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Public;