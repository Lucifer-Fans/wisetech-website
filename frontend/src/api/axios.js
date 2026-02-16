// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://wisetech-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
