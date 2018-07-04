import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var url = '/api/v2/signin'
    var data = { 'username': this.state.username, 'password': this.state.password }
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
      if(response.access_token){
        localStorage.setItem('access_token', response.access_token)
        console.log('Success', response.message)
      }
      else{
        alert('An error occured')
        console.log('Success:', response.message)
      }
    })
    }

  render(){
    return(
      <div>
        <form className="form-Group " onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>
                <label>
                    Username: <input type="text" className="form-control" name="username" onChange={this.handleChange} required />
                </label>
                <br/>
                <label>
                    Password: <input type="password" className="form-control" name="password" onChange={this.handleChange} required />
                </label>
                <br/>
                <input className="btn btn-primary" type="submit" value="Sign In" />
                <br/>
                <p>Don't have an account?<Link to="/signup">Sign Up</Link> </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
