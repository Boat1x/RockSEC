import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Declare the global window property for our config
declare global {
  interface Window {
    AMPLIFY_CONFIG: any;
  }
}

// Use the proper Amplify configure syntax
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: "https://hgxjid26ora3hdeyzvwjnwqa6q.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-mi5l4g7wqnhwlmxxtd3vzqdl5q"
    }
  }
});

// Store the config values globally to access them in components
window.AMPLIFY_CONFIG = {
  apiUrl: "https://hgxjid26ora3hdeyzvwjnwqa6q.appsync-api.us-east-1.amazonaws.com/graphql",
  apiKey: "da2-mi5l4g7wqnhwlmxxtd3vzqdl5q"
};

console.log("Amplify configured", window.AMPLIFY_CONFIG);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
