import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLink from "./components/ImageLink";
import Rank from "./components/Rank"
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'ea9a4b58e80648fc9a8f83777a6eadf0'
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imgURL: this.state.input})
    app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input).then(
    function(response) {
      console.log(response)
    },
    function(err) {
      console.log(err)
    }
  );
  }

  render() {
    return (
      <div className = "App">
          <Particles className = 'particles'
            params={{
              particles: {
                shape: {
                  type: ["circle", "triangle", "star"],
                  stroke: {
                    width: 0,
                    color: "#EFE9E8"
                  }
                },
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
            },
          interactivity: {
            detect_on: "window",
            events: {
              resize: true,
              onhover: {enable : true, mode: "repulse"},
              onclick: { enable: true, mode: "push"},
                modes: {
                  repulse: { 
                    distance: 400,
                    size: 1,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                  }
                }
            }
          }
        }
      } />
        
        <h1 style = {{textAlign: "center"}}>Hello there</h1>
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLink onInputChange ={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imgURL={this.state.imgURL} /> 
      </div>
  
    );
  }

}

export default App;
