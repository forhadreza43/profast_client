import { Outlet } from "react-router";
import ProfastLogo from "../pages/shared/profastLogo/ProfastLogo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <>
      <section className="dark:bg-gray-100 dark:text-gray-800  h-dvh w-full">
        <div className="h-full w-full flex flex-col justify-center  mx-auto lg:flex-row lg:justify-between">
          <div className="flex-1 w-full h-full p-12">
            <ProfastLogo />
            <div className="flex items-center-safe justify-center h-full">
              <Outlet></Outlet>
            </div>
          </div>
          <div className="flex items-center w-full h-full justify-center bg-[#FAFDF0] flex-1">
            <img
              src={authImage}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
