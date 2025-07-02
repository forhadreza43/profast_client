import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-16 h-16 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          403 - Unauthorized
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You don’t have permission to access this page. Please contact your
          administrator or return to safety.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-medium rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
