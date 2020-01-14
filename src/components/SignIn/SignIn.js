import React, { Component, useReducer } from 'react'

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      changeInEmail: '',
      changeInPassword: ''

    }
  }

  onEmailChange = (event) => {
    this.setState({changeInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({changeInPassword: event.target.value})
  }

  onSubmit = (event) => {
    fetch("http://localhost:3000/signin", {
      method: 'POST', //we have to make sure that this is a post, since in our backend we use a post rather than a GET
      headers: {"Content-Type": "application/json"}, //setting info to json format
      body: JSON.stringify({ // this allows us to take a js object and converts it into JSON format
        email: this.state.changeInEmail,
        password: this.state.changeInPassword
      })
    }).then(res => res.json())
      .then(data => {
        if (data.id) { //for now I am using the first user in database
          this.props.loadUser(data)
          this.props.onRouteChange('home')
        }
      })
  }
  
  render() {
    const { onRouteChange } = this.props;
      return (
        <article className=" br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
  <form className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"
        onChange = {this.onEmailChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
        onChange = {this.onPasswordChange}
        />
      </div>
    </fieldset>
    <div className="">
      <input 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="button" //this was submit before, had to change it to button
      value="Sign in"
      onClick = {this.onSubmit}
      />
    </div>
    <div className="lh-copy mt3">
    <p style = {{cursor: "pointer"}} onClick= {() => onRouteChange('register')} className="f6 link dim black db">Register?</p>
    </div>
  </form>
  </main>
  </article>
    )
  }
}

export default SignIn;