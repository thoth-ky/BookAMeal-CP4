import React, { Component } from "react";

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = { username: '' , email: '', password: '', password1: '' }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.password1 && this.state.password.length > 8){
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
            sessionStorage.setItem('access_token', response.access_token);
            console.log('Success', response.message);
        } else {
          alert('An error occured')
          console.log(response.message)
        }
        window.location.replace('/home')
      })
    } else {
      alert('Ensure passwords match and use more than 8 characters')
    }
  }

  render(){
    return(
      <div>
        <form className="form-Group" onSubmit={ this.handleSubmit }>
          <h3> Don't have an account? Create One Here!</h3>
          <label>
            <span>Username:</span><input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              <span>Email:</span> <input type="text" className="form-control" placeholder="example@mail.com" name="email" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              <span>Password:</span> <input type="password" className="form-control" onChange={this.handleChange} name="password" required />
          </label>
          <br/>
          <label>
              <span>Confirm Password:</span><input type="password" className="form-control" onChange={this.handleChange} name="password1" required />
          </label>
          <br/>
          <input className="btn btn-primary" type="submit" value="Sign Up" />
      </form>
      </div>
    );
  }
}

export default SignUp;
