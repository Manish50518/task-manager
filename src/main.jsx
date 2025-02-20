import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import "./index.css";
import App from "./App.jsx";

// Amplify Configuration using Environment Variables
Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_AWS_PROJECT_REGION,
    userPoolId: import.meta.env.VITE_AWS_USER_POOLS_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_CLIENT_ID,
    oauth: {
      domain: import.meta.env.VITE_OAUTH_DOMAIN,
      scope: ["email", "openid", "profile"],
      redirectSignIn: import.meta.env.VITE_REDIRECT_SIGNIN,
      redirectSignOut: import.meta.env.VITE_REDIRECT_SIGNOUT,
      responseType: "code",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
