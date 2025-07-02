import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Shared/Loading";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading) return <Loading />;

  if (role && role === "admin") return children;

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
