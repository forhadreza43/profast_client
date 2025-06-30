import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const reDirect = location.state ? location.state : "/";
  // console.log(reDirect);
  const handleGoogleLogin = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await axiosInstance.post("/users/upsert", {
            email: user.email,
            name: user.displayName || "Unnamed",
            photo: user.photoURL || "https://example.com/default-avatar.jpg",
            role: "user",
          });
          toast.success("Login successful");
          navigate(reDirect);
        }
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Google login failed");
      });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        aria-label="Log in with Google"
        className="p-3 bg-white rounded w-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>{" "}
        <span className="ml-3">Continue with google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
