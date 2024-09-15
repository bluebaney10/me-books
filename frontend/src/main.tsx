import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/button.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
//import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const domain: string = import.meta.env.VITE_AUTH0_DOMAIN ?? "";
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID ?? "";

//if (process.env.NODE_ENV === "production") disableReactDevTools();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
