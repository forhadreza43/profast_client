import { Link } from "react-router";
import logo from "../../../assets/logo.png";
const ProfastLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end-safe ">
        <img src={logo} alt="" className="h-12 mb-2" />
        <h1 className="text-3xl font-extrabold -ml-3">Profast</h1>
      </div>
    </Link>
  );
};

export default ProfastLogo;
