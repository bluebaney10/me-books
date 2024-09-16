import { useAuth0 } from "@auth0/auth0-react";
import "../styles/components/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <header>
      <div className="container">
        <div className="menu">
          <Link to="/">
            <div className="logo">MeBook</div>
          </Link>

          <div className="user">
            <div className="bts">
              {!isAuthenticated ? (
                <a className="bt-primary" href="/books/create">
                  <span className="txt">Add</span>
                </a>
              ) : (
                <>
                  <a className="bt-primary" href="/books/mebook">
                    <span className="txt">My Book</span>
                  </a>
                  <a className="bt-primary" href="/books/create">
                    <span className="txt">Add</span>
                  </a>
                </>
              )}
            </div>

            {!isAuthenticated ? (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            ) : (
              <div className="profile">
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
                <div className="image">
                  <picture>
                    <img src={user?.picture} alt={user?.name} />
                  </picture>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
