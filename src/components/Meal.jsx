import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Meal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      caterer: '',
      meal_id: this.props.match.params.meal_id
    }

    this.getMeal = this.getMeal.bind(this)
    this.editMeal = this.editMeal.bind(this)
    this.deleteMeal = this.deleteMeal.bind(this)
    this.getMeal();
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  getMeal(){
    const access_token = sessionStorage.getItem('access_token')
    var url = '/api/v2/meals/' + this.state.meal_id

    fetch(url, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then((response) => {
      console.log('meal',response.meal)
      this.setState({ name: response.meal.name })
      this.setState({ description: response.meal.description })
      this.setState({ price: response.meal.price })
      this.setState({ caterer: response.meal.caterer })
      console.log(response.message)
    })
  }

  deleteMeal(event){
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    var url = '/api/v2/meals/' + this.state.meal_id

    fetch(url, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'DELETE',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then((response) => {
      alert('Call delete')
      this.setState({ name: '' })
      this.setState({ description: '' })
      this.setState({ price: '' })
      this.setState({ caterer: '' })
      window.location.replace('/meals')
      console.log(response.message)
    })
  }

  editMeal(event){
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    var data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price }
    const url = this.state.meal_id
    console.log(url);
    fetch(url, {
      body: JSON.stringify({new_data: data}),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'PUT',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      alert(response.message)
    })
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>

              <h1>{ this.state.name }</h1>
              <form className="form-group" >
                <div className="form-group" >
                  <label className="control-label">Caterer: { this.state.caterer }</label>
                </div >
                <div className="form-group">
                  <label className="control-label ">Name</label>
                  <input type="text" className="form-control" value={ this.state.name } name='name' onChange={ this.handleChange }/>
                </div>
                <div className="form-group">
                  <label className="control-label">Description</label>
                  <textarea className="form-control" value={ this.state.description } name='description' onChange={ this.handleChange } />
                </div>
                <div className="form-group">
                  <label className="control-label">Price</label>
                  <input className="form-control" type="number" value={ this.state.price }  min="0.00" name='price' onChange={ this.handleChange }/>
                </div>
                <input type="button" className="btn btn-info" value="REFRESH" onClick={ this.getMeal }/>
                <input type="button" className="btn btn-danger" onClick={ this.deleteMeal } value="DELETE"/>
                <input type="button" className="btn btn-info" value="UPDATE" onClick={ this.editMeal }/>
                <p>NB: You can not delete a meal that has orders attached to it! :)</p>
              </form>
            </Col>

            <Col md={6}>
              <p>====A very interesting pic here====</p>
            </Col>
          </Row>
        </Grid>


      </div>
    )
  }
}

export default Meal;
