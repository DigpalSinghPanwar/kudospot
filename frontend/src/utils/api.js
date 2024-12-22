import axios from "./axios";

// User APIs
export const loginUser = async (name) => {
  try {
    const response = await axios.post("/users/login", { name });

    const userId = response?.data?.user?._id;
    const userName = response?.data?.user?.name;
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("name", userName);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "An error occurred while logging in.";
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch users.";
  }
};

// Kudos APIs

export const fetchFeed = async () => {
  try {
    const response = await axios.get("/kudos/feed");

    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to send kudos feed";
  }
};

export const sendKudo = async (data) => {
  try {
    const response = await axios.post("/kudos/send", data);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to send kudo.";
  }
};

export const kudoLike = async (kudoId, userId) => {
  try {
    const response = await axios.post("/kudos/like", { kudoId, userId });

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to send like.";
  }
};

export const getKudosAnalytics = async (userId) => {
  try {
    const response = await axios.get(`/kudos/analytics/sent?userId=${userId}`);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch kudos analytics.";
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get("/kudos/analytics/leaderboard");

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch leaderboard.";
  }
};
