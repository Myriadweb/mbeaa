import React from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import { rootPath } from "./config";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from "react-bootstrap/Button";
import Slideshow from "./components/Slideshow";
import Home from './components/Home';
import {CSSTransition, TransitionGroup} from "react-transition-group";
function App() {
  let location = useLocation();
  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <Routes>
            <Route path={rootPath} element={<Splash />} />
            <Route path={`${rootPath}/home`} element={<Home />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function Splash() {
  return (
    <div style={{display: "flex", alignItems: "center", height: "100vh", justifyContent: "center"}}>
      <div style={{position: "relative", zIndex: 1 }}>
        <Link to={`${rootPath}/home`} style={{color: 'white', textDecoration: 'none'}}>
          <div className="SplashTitle">All Aboard!</div>
          <Button className="SplashButton">Touch to Begin</Button>
        </Link>
      </div>
      <Slideshow />
    </div>
  );
}

export default App;
