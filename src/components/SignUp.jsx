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
      console.log(this.state)
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
            Username: <input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              E-mail: <input type="text" className="form-control" placeholder="example@mail.com" name="email" onChange={this.handleChange} required />
          </label>
          <br/>
          <label>
              Password: <input type="password" className="form-control" onChange={this.handleChange} name="password" required />
          </label>
          <br/>
          <label>
              Confirm Password: <input type="password" className="form-control" onChange={this.handleChange} name="password1" required />
          </label>
          <br/>
          <input className="btn btn-primary" type="submit" value="Sign Up" />
      </form>
      </div>
    );
  }
}



export default SignUp;
