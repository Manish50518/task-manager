import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
