import React, { Component } from "react";
import { Link , Redirect} from "react-router-dom";

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: null,
      alert: null
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
        sessionStorage.setItem('access_token', 'Bearer ' + response.access_token)
        console.log('Success', response.message)
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.setState({redirectTo: from.pathname})
      }
      else{
        this.setState({alert: response.message})
        console.log('Error:', response.message)
      }

    })
    }

  render(){
    if (this.state.redirectTo){
      window.location.replace(this.state.redirectTo)
      return (<Redirect to={ this.state.redirectTo } />)
    }

    let displayAlert = '';
    if (this.state.alert) {
      displayAlert = (
        <div className="error">
          <p>{ this.state.alert }</p>
        </div>
      )
    }
    return(
      <div className="center">

        <form className="form-Group w3-display-middle center" onSubmit={this.handleSubmit}>

          <h3>Sign In</h3>
          { displayAlert }
          <label>
              Username: <input type="text" name="username" onChange={ this.handleChange } required />
          </label>
          <br/>
          <label>
              Password: <input type="password" name="password" onChange={ this.handleChange } required />
          </label>
          <br/>
          <input className="btn btn-primary" type="submit" value="Sign In" />
          <br/>
          <p>Don't have an account?<Link to="/signup" className="links">Sign Up</Link> </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
