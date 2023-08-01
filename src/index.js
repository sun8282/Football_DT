import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Squads from "./components/TeamSquad";
import Playerdetails from "./components/playerdetails";
import Quiz from "./components/Quiz";
import "./index.css";
import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/header";
import Footer from "./components/footer";
// import axios from 'axios';
// const axios = require('axios');
document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header></Header>
            <App />
            <Footer></Footer>
          </>
        }
      />
      <Route
        path="/details/:id"
        element={
          <>
            <Header></Header>
            <Squads />
            <Footer></Footer>
          </>
        }
      />
      <Route
        path="/playerdetails/:id"
        element={
          <>
            <Header></Header>
            <Playerdetails />
            <Footer></Footer>
          </>
        }
      />
      <Route
        path="/Quiz"
        element={
          <>
            <Header></Header>
            <Quiz />
            <Footer></Footer>
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
