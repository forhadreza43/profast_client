import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../shared/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      // 1. Upload image to imgbb
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imgData = imageRes.data;
      if (!imgData.success) throw new Error("Image upload failed.");

      const imgURL = imgData.data.url;

      // 2. Try to create user in Firebase
      const result = await createUser(data.email, data.password);
      const user = result.user;
      if (!user) throw new Error("User creation failed.");

      // 3. Save user info in your backend (using upsert)
      await axiosInstance.post("/users/upsert", {
        email: data.email,
        name: data.name,
        photo: imgURL,
        role:'user'
      });

      // 4. Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imgURL,
      });

      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in.");
      } else {
        console.error("Registration error:", err.message);
        toast.error(err.message || "Registration failed.");
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:text-gray-800">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p>Register with Profast</p>
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="photo"
              className="block font-bold dark:text-gray-600"
            >
              Upload Image
            </label>
            <input
              {...register("photo")}
              type="file"
              name="photo"
              id="photo"
              placeholder="name"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="name"
              className="block font-bold dark:text-gray-600"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              id="name"
              placeholder="name"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
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
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm font-bold  dark:bg-[#CAEB66]"
          >
            Register
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
          Already have an account?
          <Link to="/login" className="underline dark:text-gray-800">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
