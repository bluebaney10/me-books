import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <Link to={destination} className="bt-back">
      Back
    </Link>
  );
};

export default BackButton;
