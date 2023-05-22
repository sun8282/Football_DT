import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Squads from "./components/TeamSquad";
import Playerdetails from "./components/playerdetails";
import "./index.css";
import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import axios from 'axios';
// const axios = require('axios');

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<Squads />} />
      <Route path="/playerdetails/:id" element={<Playerdetails />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
