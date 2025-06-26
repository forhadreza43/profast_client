import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const RootLayout = () => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto min-h-dvh">
      <Navbar />
      <div className="mt-35">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
