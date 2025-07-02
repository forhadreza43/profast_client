import { FaTruckLoading } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
      <FaTruckLoading className="animate-spin text-blue-600 dark:text-blue-400 text-6xl mb-4" />
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Loading... Please wait
      </p>
    </div>
  );
};

export default Loading;
