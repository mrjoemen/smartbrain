import React, { Component } from 'react'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeInName: '',
      changeInEmail: '',
      changeInPassword: ''
    }
  }  
  onNameChange = (event) => {
    this.setState({changeInName: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({changeInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({changeInPassword: event.target.value})
  }

  onSubmit = () => {
    fetch("https://damp-inlet-99095.herokuapp.com/register", {
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        name: this.state.changeInName,
        email: this.state.changeInEmail,
        password: this.state.changeInPassword
      })
    })
    .then(res => res.json())
    .then(user => {
      if (user) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })

    console.log(this.state)
    
  }

  
  render() {
     const { onRouteChange } = this.props;
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
  <form className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="Name"  
        id="Name"
        onChange = {this.onNameChange}
        />
        </div>
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
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
      type="button" 
      value="Sign up!"
      onClick = {this.onSubmit}
      />
    </div>
  </form>
  </main>
  </article>
    )
  }

}

export default Register;