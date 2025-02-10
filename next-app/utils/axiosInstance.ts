import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    referer: process.env.NEXT_PUBLIC_BASE_URL, // Automatically include referer header
  },
});

export default apiClient;
