import React from 'react';
import './App.css';
import 'tachyons';
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLink from "./components/ImageLink";
import Rank from "./components/Rank"
import Particles from 'react-particles-js'

function App() {
  return (
    <div className = "App">
        <Particles className = 'particles'
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              polygon: {
              move: {
                enable: true
                
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable : true, mode: "repulse"
                },
                onclick: { enable: true, mode: "push"}

              }
            }
          }
        }
    } />
      
      <h1 style = {{textAlign: "center"}}>Hello there</h1>
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLink />
    </div>

  );
}

export default App;
