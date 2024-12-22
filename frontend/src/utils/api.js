import axios from "./axios";

// User APIs
export const loginUser = async (name) => {
  try {
    const response = await axios.post("/users/login", { name });
    console.log(response, "login");

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
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch users.";
  }
};

// Kudos APIs

export const fetchFeed = async () => {
  try {
    const response = await axios.get("/kudos/feed");
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error.response?.data?.error || "Failed to send kudos feed";
  }
};

export const sendKudo = async (data) => {
  try {
    const response = await axios.post("/kudos/send", data);
    console.log(response);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to send kudo.";
  }
};

export const kudoLike = async (kudoId, userId) => {
  try {
    const response = await axios.post("/kudos/like", { kudoId, userId });
    console.log(response);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to send like.";
  }
};

export const getKudosAnalytics = async (userId) => {
  try {
    const response = await axios.get(`/kudos/analytics/sent?userId=${userId}`);
    console.log(response);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch kudos analytics.";
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get("/kudos/analytics/leaderboard");
    console.log(response);

    return response;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch leaderboard.";
  }
};
