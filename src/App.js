import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLink from "./components/ImageLink";
import Rank from "./components/Rank"
import SignIn from './components/SignIn/SignIn'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition'
import Clarifai from 'clarifai'
import Register from './components/Register/Register'
import ShowAttributes from './components/ShowAttributes';

const app = new Clarifai.App({
  apiKey: 'b3d319f1ade24d80a7afb9b0b5982401' //this key is from clarifai 
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgURL: '',
      box: {},
      route: 'signin',
      user: {
        id: '', //id must be a string for whatever reason
        name: '',
        email: '',
        rank: 0,
        joined: ''
      },
      attributes: {}
    }
  }

  faceLocation = (response) => { //from onSubmit function
    const face = response.outputs[0].data.regions[0].region_info.bounding_box; // this is to access the points of where the box is located
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(face)
    console.log(response)
    console.log(width, height)
    return {
      leftColumn: face.left_col * width,
      topRow: face.top_row * height,
      rightColumn: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
  }
  
  getAttributes = (response) => {
    const { face } = response.outputs[0].data.regions[0].data
    const age = face.age_appearance.concepts[0].name;
    const agePercent = face.age_appearance.concepts[0].value;
    const gender = face.gender_appearance.concepts[0].name;
    const genderPercent = face.gender_appearance.concepts[0].value;
    const eth = face.multicultural_appearance.concepts[0].name;
    const ethPercent = face.multicultural_appearance.concepts[0].value;
    console.log(age, agePercent)
    console.log(gender, genderPercent)
    console.log(eth, ethPercent)
    const attributes = {
      age : age,
      agePercent: agePercent,
      gender: gender,
      genderPercent: genderPercent,
      eth: eth,
      ethPercent: ethPercent
    }
    this.setState({attributes: attributes})
  }
  displayFaceBox = (box) => {
    //console.log(box) // displays the new box object after the calculations from faceLocations
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imgURL: this.state.input})
    app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input)
    .then(response =>  {
      if (response) {
        fetch("https://damp-inlet-99095.herokuapp.com/image", {
          method: 'PUT', //we have to make sure that this is a post, since in our backend we use a post rather than a GET
          headers: {"Content-Type": "application/json"}, //setting info to json format
          body: JSON.stringify({ // this allows us to take a js object and converts it into JSON format
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {rank: count}))
        }) 
      }
      this.displayFaceBox(this.faceLocation(response))
      this.getAttributes(response)
    }) // must use .then here for this to work rather than a regular function
    .catch(err => console.log(err))

  }
  onRouteChange = (route) => {
    this.setState({route: route})
  }

  loadUser = (change) => {
    this.setState({user: {
      id: change.id, //id must be a string for whatever reason
      name: change.name,
      email: change.email,
      rank: change.rank,
      joined: change.joined
    }})
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
              onclick: { enable: false, mode: "bubble"},
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

        {this.state.route === 'home' ? //if so, then return the home page
        <div>
          <Navigation onRouteChange = {this.onRouteChange} />
          <Logo />
          <Rank name = {this.state.user.name} rank = {this.state.user.rank} />
          <ImageLink onInputChange ={this.onInputChange} onSubmit={this.onSubmit} />
          {Object.entries(this.state.attributes).length === 0 && this.state.attributes.constructor === Object ? null : <ShowAttributes attributes = {this.state.attributes} />}
          <FaceRecognition box = {this.state.box} imgURL={this.state.imgURL} />
        </div> : //otherwise
        (
          this.state.route === 'signin' ? // if this is true, then do the first one
          <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
      }
      </div>
  
    );
  }

}

export default App;
