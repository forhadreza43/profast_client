import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // const logout = async () => {
  //   try {
  //     await logOut()
  //     await axiosSecure.post("/logout", {});
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.error("Logout failed", error.message);
  //   }
  // };

  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // console.warn("Interceptor hit:", error?.response?.status);
      if (error?.response?.status === 403) {
        navigate("/unauthorized");
      }
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // console.log("Calling refresh token...");
          await axiosSecure.post("/refresh-token");
          // console.log("refresh token called....");

          // ✅ Delay to ensure browser syncs the new cookie
          await new Promise((resolve) => setTimeout(resolve, 100));

          return axiosSecure(originalRequest);
        } catch (refreshErr) {
          console.error("Refresh token failed:", refreshErr);
          await logOut();
          await axiosSecure.post("/logout", {});
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
