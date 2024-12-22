import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { toast } from "react-toastify";
import { useUser } from "../utils/UserProvider";

const WelcomePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    const login = sessionStorage.getItem("userId");
    if (login) {
      navigate("/landing");
    }
  }, [login]);

  const handleLogin = async () => {
    if (!name.trim()) {
      toast.info("Please enter your name.");
      return;
    }

    try {
      const response = await loginUser(name);
      console.log(response);

      login(response?.user?._id); // Save to context
      toast.success(`Welcome ${name}`);
      navigate("/landing");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-6 bg-white rounded-lg shadow-lg w-11/12 sm:w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to KudoSpot
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
