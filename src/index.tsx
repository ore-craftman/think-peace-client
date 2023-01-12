import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //   <React.StrictMode>
  <App />
  //   </React.StrictMode>
);
