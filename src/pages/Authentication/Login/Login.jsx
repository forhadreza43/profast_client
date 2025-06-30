import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../shared/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const reDirect = location.state ? location.state : "/";
  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await axiosInstance.post("/users/upsert", {
            email: user.email,
            name: user.displayName || "Unnamed",
            photo: user.photoURL || "https://example.com/default-avatar.jpg",
          });
          toast.success("Login successful");
          navigate(reDirect);
        }
      })
      .catch((error) => {
        toast.error("Incorrect email or password.");
        console.error(error.message);
      });
  };
  
  return (
    <>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:text-gray-800">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p>Log in with Profast</p>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="block font-bold dark:text-gray-600"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block font-bold dark:text-gray-600"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            <div className="flex justify-end text-xs dark:text-gray-600">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm font-bold  dark:bg-[#CAEB66]"
          >
            Log in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>
        <GoogleLogin />
        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Don't have an account?
          <Link to="/register" className="underline dark:text-gray-800">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
