import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux";
import App from "./App";
import { CookiesProvider } from "react-cookie";
const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>
);
