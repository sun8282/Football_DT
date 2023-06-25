import { useEffect } from "react";
import React, { useState } from "react";
import "./App.css";
import Table from "./components/teamtable";
import Plvideo from "./components/plvideo";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewsList from "./components/newslist";

function App() {
  return (
    <>
      <Plvideo></Plvideo>
      <div className="tablecontainer">
        <Table></Table>
        <NewsList></NewsList>
      </div>
    </>
  );
}

export default App;
