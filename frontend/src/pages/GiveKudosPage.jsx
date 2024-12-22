import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { getUsers, sendKudo } from "../utils/api";
import { toast } from "react-toastify";
import { useUser } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";

const GiveKudosPage = () => {
  const { userId, logout } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    to: "",
    from: userId,
    badge: "Helping Hand",
    reason: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        setUsers(response?.users);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendKudo(formData);
      toast.success("Kudos sent successfully!");
      setFormData({ to: "", badge: "Helping Hand", reason: "" });
    } catch (error) {
      toast.error("Failed to send kudos.");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfull");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-yellow-400">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none shadow-md"
        >
          Logout
        </button>
      </div>
      <div className="max-w-xl w-full mx-4 sm:mx-auto p-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Give Kudos
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="to"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Recipient
            </label>
            <select
              id="to"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select a recipient</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="badge"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Badge
            </label>
            <select
              id="badge"
              value={formData.badge}
              onChange={(e) =>
                setFormData({ ...formData, badge: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option>Helping Hand</option>
              <option>Excellence</option>
              <option>Above and Beyond</option>
              <option>Client Focus</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="reason"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Reason
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Describe the reason for the kudos"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
          >
            Send Kudos
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiveKudosPage;
