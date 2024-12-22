import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFeed, kudoLike } from "../utils/api";
import { toast } from "react-toastify";
import { useUser } from "../utils/UserProvider";

const LandingPage = () => {
  const { userId, logout } = useUser();

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchKudoFeed = async () => {
      try {
        const response = await fetchFeed();
        setFeed(response?.kudos);
      } catch (error) {
        toast.error("Error fetching feed");
      }
    };
    fetchKudoFeed();
  }, []);

  const toggleLike = async (kudoId) => {
    try {
      const response = await kudoLike(kudoId, userId);

      const updatedFeed = feed.map((kudo) =>
        kudo._id === kudoId ? response?.data?.updatedKudo : kudo
      );

      setFeed(updatedFeed);
    } catch (error) {
      toast.error("Error toggling like");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfull");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to KudoSpot Dashboard
      </h1>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Link to="/give-kudos">
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Give Kudos
          </button>
        </Link>
        <Link to="/analytics">
          <button className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            View Analytics
          </button>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4">Kudos Feed</h2>
      <div className="space-y-4">
        {feed.map((kudo) => (
          <div key={kudo._id} className="p-4 border rounded shadow bg-white">
            <h2 className="font-semibold text-lg">
              {kudo.from.name} gave kudos to {kudo.to.name}
            </h2>
            <p className="text-sm text-gray-600">
              {kudo.badge}: {kudo.reason}
            </p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => toggleLike(kudo._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {kudo?.likes?.includes(userId) ? "Unlike" : "Like"}
              </button>
              <span className="ml-2 text-gray-700">
                {kudo.likes.length} Likes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
