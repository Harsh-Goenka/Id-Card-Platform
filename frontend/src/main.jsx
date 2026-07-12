
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";

import "./index.css";
import {
  AuthProvider,
} from "./context/AuthContext";
import { Toaster } from "sonner";


import "./styles/global.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </AuthProvider>
  </Provider>
);