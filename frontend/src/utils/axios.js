import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:10000/api/v1",
  baseURL: "https://kudospot-m1m3.onrender.com/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
