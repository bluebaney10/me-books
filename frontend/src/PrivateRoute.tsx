import PopupLogin from "./components/PopupLogin";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [showPopup, setShowPopup] = useState(!isAuthenticated);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  if (isLoading) {
    return <div className="text-center pad-top-16">Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    showPopup && <PopupLogin onClose={handleClosePopup} showPopup={showPopup} />
  );
};

export default PrivateRoute;
