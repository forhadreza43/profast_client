import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "aos/dist/aos.css";
import AOS from "aos";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";
AOS.init();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className=" bg-gray-100 dark:bg-gray-800">
          <RouterProvider router={router} />
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
