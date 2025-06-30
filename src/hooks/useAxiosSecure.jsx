import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

const logout = async () => {
  try {
    await signOut(auth);
    await axiosSecure.post("/logout");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error.message);
  }
};

axiosSecure.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosSecure.post("/refresh-token");
        return axiosSecure(originalRequest); // Retry original request
      } catch (refreshErr) {
        console.log("Refresh token failed", refreshErr);
        //log out here
        await logout();
      }
    }

    return Promise.reject(error);
  }
);

export default useAxiosSecure;
