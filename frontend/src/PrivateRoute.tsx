import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PopupLogin from "./components/PopupLogin";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<unknown>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [showPopup, setShowPopup] = useState(!isAuthenticated);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component />
  ) : (
    showPopup && <PopupLogin onClose={handleClosePopup} showPopup={showPopup} />
  );
};

export default PrivateRoute;
