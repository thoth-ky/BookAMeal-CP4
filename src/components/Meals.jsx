import React, { Component } from 'react';
import { Alert, Well, Button, Modal, Panel } from "react-bootstrap";

class Meals extends Component {
  constructor(props){
    super(props)
    this.state = {
      meal_id: null,
      name: null,
      description: null,
      price: null,
      meals: [],
      show_modal:false,
      alert: null
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })

  }

  getMeals = () => {
     const access_token = sessionStorage.getItem('access_token')
     let url = '/api/v2/meals'

     fetch(url, {
       headers: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': "*",
         'Authorization': access_token
       },
       method: 'GET',
       mode: 'cors',
     })
     .then((response)  =>{

       if (response.status === 401){
         this.setState({error:'Ooops, this is a restricted area.'})
       }
       return response.json()
     })
     .catch(error => console.error('Error: ', error))
     .then((response) => {
       this.setState({
         meals: response.meals,
         alert: response.message
       })
     })
   }

  createMeal = (event) => {
    event.preventDefault();
    const access_token = sessionStorage.getItem('access_token')
    let name = this.state.name
    let price = this.state.price
    let description = this.state.description
    let url = '/api/v2/meals'
    let data = {name: name, price: price, description: description}
    console.log(data)
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'POST',
      mode: 'cors',
    })
    .then((response)  =>response.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      this.setState({
        name: null,
        meal_id: null,
        description: null,
        price: null,
        alert: response.message,
        show_modal: false
      })
    })
  }

  addToMenu = (e) =>{
    e.preventDefault()
    let meal_id = e.currentTarget.dataset.id
    let url = '/api/v2/menu'
    const access_token = sessionStorage.getItem('access_token')
    let data = {meal_list:[parseInt(meal_id, 10)]}

    console.log(data)
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'POST',
      mode: 'cors',
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then(response =>{
      this.setState({alert: response.message})
    })
  }

  showDetail = (e) =>{
    e.preventDefault()
    let meal_id = e.currentTarget.dataset.id
    let meal_name = e.currentTarget.dataset.name
    let description = e.currentTarget.dataset.description
    let price = e.currentTarget.dataset.price
    this.setState({
      meal_id: meal_id,
      name: meal_name,
      description: description,
      price:price,
      show_modal: true
    })
  }

  Meal = (meal) => {
    let meal_item = meal.meal
    let meal_id = meal_item.meal_id
    let name = meal_item.name
    let description = meal_item.description
    let price = meal_item.price
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Meal { meal_id }</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="row">
            <div className="col-md-2">{ name }</div>
            <div className="col-md-5">{ description }</div>
            <div className="col-md-2">Kes { price }.00</div>
            <Button onClick={ this.showDetail } bsStyle="primary" data-id={ meal_id} data-price={ price } data-name={ name } data-description={ description }>
              Details
            </Button>
            <Button onClick={ this.addToMenu } bsStyle="primary" data-id={ meal_id}>
              Add To Menu
            </Button>
          </div>
        </Panel.Body>
      </Panel>
    )
  }

  displaymeals = () => {
    let meals = this.state.meals
    const mealNode = meals.map((meal)=>{
      return (<this.Meal meal={ meal }/>)
    })

    return (
        <Well>
          { this.showAlert() }
          { mealNode }
        </Well>
    );
  }

  handleCloseModal = (e) =>{
    e.preventDefault()
    this.setState({ show_modal: false })
  }

  deleteMeal = (event) =>{
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    if(this.state.meal_id){
      let url = '/api/v2/meals/' + this.state.meal_id
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
        this.setState({
          meal_id: null,
          name: null,
          description: null,
          price: null,
          show_modal: false,
          alert: response.message,
        })
        console.log(response.message)
      })
    } else {
      this.setState({alert:'Sorry, Cannot delete non-existent meal'})
    }
  }

  editMeal = (event) =>{
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    if (this.state.meal_id){
      let data = {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price }
      let url = '/api/v2/meals/' + this.state.meal_id
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
        this.setState({
          meal_id: null,
          name: null,
          description: null,
          price: null,
          show_modal: false,
          alert: response.message
        })
      })
    } else {
      this.setState({alert:'Sorry, Cannot edit non-existent meal'})
    }
  }

  showAlert = () => {
    if (this.state.alert){
      return(
        <Alert onDismiss={ this.dismissAlert }>{ this.state.alert }</Alert>
      )
    } else {
      return null
    }
  }

  dismissAlert = (e) =>{
    this.setState({alert: null})
  }

  render(){
    if (this.state.meals.length === 0){
      this.getMeals()
    }

    if (this.state.error){
      return(
        <div className="w3-display-middle">
          <p>{ this.state.error }</p>
        </div>
      )
    }
    return(
      <div>
        <div className="w3-cell-row">
          <h2 className="w3-conatiner w3-cell">Meals</h2>
          <Button className=" w3-container w3-cell" bsStyle="primary" onClick={ this.showDetail } bsSize="lg">CREATE A NEW MEAL</Button>
          <Button className=" w3-container w3-cell" bsStyle="primary" onClick={ this.getMeals } bsSize="lg">REFRESH</Button>
        </div>
        <div>
          < this.displaymeals />
        </div>
        <Modal show={this.state.show_modal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title><span>MEAL DETAILS </span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            < this.showAlert/>
            <form  className="form-group">
              <div className="form-group">
                <label>Name</label>
                <input className="form-control" name="name" value={ this.state.name } onChange={ this.handleChange } type="text" placeholder="Meal Name" required/>
              </div>
              <div className="form-group">
                <label >Description</label><br/>
                <textarea className="form-control" name="description" value={ this.state.description } onChange={ this.handleChange } placeholder="Enter description here" required/>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input className="form-control" name="price" placeholder="0.00" value={ this.state.price } onChange={ this.handleChange } type="number" min="0.00" required/>
              </div>
              <Button onClick={ this.editMeal } bsStyle="primary">EDIT</Button>
              <Button onClick={ this.deleteMeal } bsStyle="primary">DELETE</Button>
              <Button onClick={ this.createMeal } bsStyle="primary">CREATE</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Meals;
