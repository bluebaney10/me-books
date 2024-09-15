import { useAuth0 } from "@auth0/auth0-react";
import "../styles/components/popup-login.css";

interface Props {
  onClose: () => void;
  showPopup: boolean;
}

const PopupLogin = ({ onClose, showPopup }: Props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={showPopup ? "popup-login active" : "popup-login"}>
      <div className="panel">
        <div className="login-container">
          <div className="title">
            <p className="heading">Please Login</p>
          </div>
          <button className="bt-tertiary" onClick={() => loginWithRedirect()}>
            <span className="txt">Login</span>
          </button>
        </div>

        <button className="bt-close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default PopupLogin;
