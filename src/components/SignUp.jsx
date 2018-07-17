import React, { Component } from "react";
import { Link } from "react-router-dom";


class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '' ,
      email: '',
      password: '',
      password1: '',
      alert: null
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.password1 && this.state.password.length >= 8){
      var url = '/api/v2/signup'
      var data = { 'username': this.state.username, 'email': this.state.email, 'password': this.state.password }
      console.log(data)
      fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        method: 'POST',
        mode: 'cors',
      })
      .then((response)  => response.json())
      .catch(error => console.error('Error: ', error))
      .then(response => {
        if (response.access_token) {
            sessionStorage.setItem('access_token', 'Bearer ' + response.access_token);
            console.log('Success', response.message);
            window.location.replace('/')
        } else {
          this.setState({alert: response.message})
          console.log(response.message)

        }

      })
    } else {
      let msg = 'Ensure passwords match and use more than 8 characters'
      this.setState({alert: msg})
    }
  }

  render(){
    let displayAlert = '';
    if (this.state.alert){
      displayAlert = (
        <div className="error">
          <p>{ this.state.alert }</p>
        </div>
      )
    }
    return(
      <div>

        <form className="form-Group w3-display-middle center" onSubmit={ this.handleSubmit }>

          <h3> Registration Form</h3>
          { displayAlert }
          <label>
            <span>Username:</span><input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              <span>Email:</span> <input type="text" className="form-control" placeholder="example@mail.com" name="email" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              Password: <input type="password" className="form-control" onChange={this.handleChange} name="password" pattern=".{8,}" required title="Atleast 8 characters." />
          </label>
          <br/>
          <label>
              Confirm Password: <input type="password" className="form-control" onChange={this.handleChange} name="password1" pattern=".{8,}" required title="Atleast 8 characters." />
          </label>
          <br/>
          <input className="btn btn-primary" type="submit" value="Sign Up" />
            <br/>
            <p>Already have an account?<Link to="/signin" className="links">Sign In</Link> </p>
      </form>
      </div>
    );
  }
}

export default SignUp;
