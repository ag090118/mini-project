import React from "react";
import ReactDOM from "react-dom";
import store from "./components/store.js";
import App from "./App";
import { Provider } from "react-redux";
store.subscribe(() => console.log(store.getState()));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
