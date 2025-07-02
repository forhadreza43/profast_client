import { FaBox, FaUserShield, FaShippingFast } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import useUserRole from "../../../hooks/useUserRole";
import AdminHome from "./AdminHome";
import RiderHome from "./RiderHome";
import UserHome from "./UserHome";
import Unauthorized from "../../UnAuthorized/Unauthorized";

const DashboardHome = () => {
  const {role} = useUserRole();

  if(role === "admin"){
    return <AdminHome />;
  }
  if(role === "rider"){
    return <RiderHome />;
  }
  if(role === "user"){
    return <UserHome />;
  }
  return <Unauthorized />;

  
};

export default DashboardHome;
