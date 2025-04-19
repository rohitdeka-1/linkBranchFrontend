
import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true, 
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - redirecting to login");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
)

export default axios;





