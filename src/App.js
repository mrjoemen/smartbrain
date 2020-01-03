import React from 'react';
import './App.css';
import 'tachyons';
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLink from "./components/ImageLink";
import Rank from "./components/Rank"

function App() {
  return (
    <div>
      <h1 style = {{textAlign: "center"}}>Hello there</h1>
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLink />

    </div>

  );
}

export default App;
