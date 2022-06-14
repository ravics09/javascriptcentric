import "core-js/stable";
import "@babel/polyfill";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import "./App.css";
import { Store } from "./store";
import Routes from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  const theme1 = {
    backgroundColor: "black",
    height: "100%",
  };

  const theme2 = {
    backgroundColor: "#181a1f",
    height: "100%",
  };

  return (
    <div style={theme2}>
      <StoreProvider store={Store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
};

export default App;
