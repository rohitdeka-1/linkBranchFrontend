import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { isAxiosError } from "axios";

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

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/me`,
          {
            withCredentials: true,
          }
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Selected image:", file);
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.post(image_URI, formData, {
        withCredentials: true,
      });

      console.log("Image uploaded successfully:", res.data);

      setUser((prevUser) => {
        if (!prevUser) return null;
        return { ...prevUser, profilePic: res.data.image };
      });
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#2b2a2a] to-black min-h-screen text-white p-5">
      <h1 className="text-3xl text-center mb-4 font-bold">Dashboard</h1>

      {error ? (
        <p className="text-red-400 slide-in">{error}</p>
      ) : user ? (
        <div className="space-y-2">
          <div className="flex justify-center mb-4">
            {user.profilePic ? (
              <button
                onClick={handleUploadImage}
                className="rounded-full w-24 h-24 border-1 "
              >
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="rounded-full w-24 h-24 border-2 border-white"
                />
                
              </button>
            ) : (
              <button
                onClick={handleUploadImage}
                className="rounded-full hover:bg-red-300 w-24 h-24 bg-gray-700 flex items-center justify-center text-xl"
              >
                {user.fullname?.charAt(0)}
                
              </button>
            )}
            
            
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

          <p>
            <strong>Welcome,</strong> {user.fullname}!
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "No bio yet"}
          </p>
          <p>
            <strong>Links:</strong>
          </p>
          <ul>
            {user.links.map((link) => (
              <li key={link._id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
