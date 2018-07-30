import React, { Component } from "react";

class SignOut extends Component{
  constructor(props){
    super(props)
    this.state = {access_token: sessionStorage.getItem('access_token')}
  }
  
  signOut = () => {
    const url = '/api/v2/signout';
    fetch (url, {
      headers: {
        'Authorization': this.state.access_token,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    sessionStorage.removeItem('access_token')
    window.location.replace('/home')
  }
  render(){
    this.signOut()
    return(
      <div>
        <p>You have successfuly logged out</p>
      </div>
    )
  }
}

export default SignOut;
