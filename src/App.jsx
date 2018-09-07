import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom';
import { Well } from 'react-bootstrap';
import decode from 'jwt-decode';

import NavBar from './common/NavBar';
import NotFound from './common/NotFound';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Menu from './components/Menu';
import Meals from './components/Meals';
import Orders from './components/Orders';

// checks if user is authenticated
const isAuthenticated = () => {
  
  const accessToken = sessionStorage.getItem('access_token')
  try {
    const { exp } = decode(accessToken);
    const now = (new Date().getTime()) / 1000
    if (exp > (now / 1000)) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}


// defines private routes
const PrivateRoute = ({ component: Compo, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Compo {...props} />
      : <Redirect to={{ pathname: '/signin', state: { from: props.location, redirectToReferrer: true } }} />
    )}
  />
)

// main app component
class App extends Component {
  // default state
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      admin: false,
      username: null,
    }
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth() {
    // check if user is authenticated and in what role
    const token = sessionStorage.getItem('access_token')
    try {
      const { admin, username } = decode(token)
      this.setState({
        authenticated: true,
        admin: admin,
        username: username,
      })
    } catch (error) {
      this.setState({
        authenticated: false,
        admin: false,
        username: null,
      })
    }
  }

  render = () => {
    const { authenticated, admin, username } = this.state
    return (
      <Router>
        <div>
          <Well>
            <header>
              <NavBar isAuthenticated={authenticated} isAdmin={admin} username={username} />
            </header>
          </Well>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/signout" component={SignOut} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/meals" component={Meals} />
            <PrivateRoute path="/orders" component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
