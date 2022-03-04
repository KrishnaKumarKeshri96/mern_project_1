import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";

function App() {
  return (
    <>
      <Router>
        <Header />
      </Router>
    </>
  );
}

export default App;
