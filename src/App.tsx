import React, { useEffect } from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import { rootPath } from "./config";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from "react-bootstrap/Button";
import Slideshow from "./components/Slideshow";
import Home from './components/Home';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ReactPlayer from "react-player";
function App() {
  useEffect(() => {
    document.title = "All Aboard!";
  })
  let location = useLocation();
  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <Routes>
            <Route path={rootPath} element={<Splash2 />} />
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

function Splash2() {
  return (
    <Link to={`${rootPath}/home`}>
      <ReactPlayer url={require('../src/assets/aa_intro.webm')} playing={true} muted={true} loop={true} controls={false} height={1080} width={1920} />
    </Link>
  )
}

export default App;
