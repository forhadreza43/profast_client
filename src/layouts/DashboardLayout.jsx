import { Link, NavLink, Outlet } from "react-router";
import ProfastLogo from "../pages/shared/profastLogo/ProfastLogo";
import {
  FaHome,
  FaBox,
  FaMoneyCheckAlt,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaMotorcycle,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";
const DashboardLayout = () => {
  const { role, isLoading } = useUserRole();
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Dashboard</div>
          </div>
          {/* Page content here */}
          <div className="p-10">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="dashboard menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <ProfastLogo />
            </li>
            <li>
              <NavLink to="/dashboard/home" end>
                <FaHome className="mr-2" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myParcels" end>
                <FaBox className="mr-2" /> My Parcels
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/paymentHistory" end>
                <FaMoneyCheckAlt className="mr-2" /> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/track" end>
                <FaMapMarkerAlt className="mr-2" /> Track a Package
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile" end>
                <FaUserEdit className="mr-2" /> Update Profile
              </NavLink>
            </li>
            {!isLoading && role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/active-riders">
                    <FaUserCheck className="mr-2" /> Active Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/pending-riders">
                    <FaUserClock className="mr-2" /> Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-admin">
                    <MdAdminPanelSettings className="mr-2" /> Mange Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/assign-rider">
                    <FaMotorcycle className="mr-2" /> Assign Rider
                  </NavLink>
                </li>
              </>
            )}
            {!isLoading && role === "rider" && (
              <>
                <li>
                  <NavLink to="/dashboard/pending-deliveries">
                    <FaClock className="mr-2" /> Pending Deliveries
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/complete-deliveries">
                    <FaCheckCircle className="mr-2" /> Complete Deliveries
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
