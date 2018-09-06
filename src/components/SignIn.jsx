import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      alert: null,
    }
  }

  handleChange = (event) => {
    // updates state as user input chages
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    // send signin request to api
    event.preventDefault();
    const url = 'https://bookameal-staging.herokuapp.com/api/v2/signin'
    const { username, password } = this.state
    const data = { username: username, password: password }
    this.setState({ submitted: true })
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      mode: 'cors',
    })
      .then(response => response.json())
      .catch(error => console.error('Error: ', error))
      .then((response) => {
        if (response.access_token) {
          // set access token in sessionStorage
          sessionStorage.setItem('access_token', `Bearer ${response.access_token}`)
          const { location } = this.props
          let from;
          try {
            from = location.state.from
            if (!from.pathname) {
              from = { pathname: '/menu' }
            }
          } catch (error) {
            from = { pathname: '/menu' }
          }
          // const { from } = location.state || { from: { pathname: '/' } }
          this.setState({ redirectTo: from.pathname })
        } else {
          // if there is an error display error alert
          this.setState({ alert: response.message })
        }
      })
  }

  render() {
    // check if redirecturl exists and redirect appropriately
    const { redirectTo } = this.state
    if (redirectTo) {
      window.location.replace(redirectTo)
      return (
        <Router>
          <Redirect to={redirectTo} />
        </Router>)
    }

    // check if alert exist and display it
    let displayAlert = '';
    const { alert } = this.state
    if (alert) {
      displayAlert = (
        <div className="error">
          <p>{ alert }</p>
        </div>
      )
    }
    return (
      <div className="center">

        <form className="form-Group w3-display-middle center" onSubmit={this.handleSubmit}>

          <h3>Sign In</h3>
          { displayAlert }
          <label htmlFor="username">
              Username:
            <input className="form-control" type="text" name="username" onChange={this.handleChange} required />
          </label>
          <br />
          <label htmlFor="password">
              Password:
            <input className="form-control" type="password" name="password" onChange={this.handleChange} required />
          </label>
          <br />
          <input className="btn btn-primary" type="submit" value="Sign In" />
          <br />
          <p>
            { "Don't have an account? "}
            <a href="/signup" className="links">Sign Up</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
