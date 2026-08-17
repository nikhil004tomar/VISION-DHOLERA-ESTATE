import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000",

  // Send the HttpOnly admin_session cookie
  // with every API request
  withCredentials: true,
});

export default api;