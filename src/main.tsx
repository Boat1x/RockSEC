import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Use a placeholder configuration during development
const tempOutputs = {
  // Add your temporary Amplify configuration here
};

// Amplify.configure(outputs);
Amplify.configure(tempOutputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
