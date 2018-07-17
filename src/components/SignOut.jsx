import React, { Component } from "react";
import { Redirect } from "react-router-dom"

const url = '/api/v2/signout';
const access_token = sessionStorage.getItem('access_token');

class SignOut extends Component{
  constructor(props){
    super(props)
    this.state = { isLoggedOut: false}
  }
  signOut = () => {
    const url = '/api/v2/signout';
    const access_token = sessionStorage.getItem('access_token');
    fetch (url, {
      headers: {
        'Authorization': access_token,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      console.log('Success:', response.message)
      this.setState({isLoggedOut: true})
      sessionStorage.removeItem('access_token')
    })
    return(
      <div>
        <p>You have successfuly logged out</p>
      </div>
    )
  }
  render(){
    if(this.state.isLoggedOut===false){
      return(
        <div>
          <this.signOut />
        </div>
      )
    } else {
      return <Redirect to="/signin" />
    }

  }
}

export default SignOut;
