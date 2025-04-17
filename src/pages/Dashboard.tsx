import { useEffect, useState } from "react";
import axios from "axios";

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

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("/api/v1/user/me", {
          withCredentials: true, 
        });

        setUser(res.data.user);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
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

  return (
    <div className="bg-black min-h-screen text-white p-5">
      <h1 className="text-3xl mb-4">Dashboard</h1>

      {error ? (
        <p className="text-red-400">{error}</p>
      ) : user ? (
        <div className="space-y-2">
          <p><strong>Welcome,</strong> {user.fullname}!</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>
          <p><strong>Links:</strong></p>
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