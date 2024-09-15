import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "../styles/components/button-back.css";

const ButtonBack = ({ destination = "/" }) => {
  const { isAuthenticated } = useAuth0();

  return !isAuthenticated ? (
    <Link to={destination} className="button-back">
      <span className="icon"></span>
      <span className="txt">Back</span>
    </Link>
  ) : (
    <Link to="/books/mebook" className="button-back">
      <span className="icon"></span>
      <span className="txt">Back</span>
    </Link>
  );
};

export default ButtonBack;
