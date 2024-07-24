import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

// if (process.env.NODE_ENV === "development") {
//   const axe = require("react-axe");
//   axe(React, ReactDOM, 1000);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
