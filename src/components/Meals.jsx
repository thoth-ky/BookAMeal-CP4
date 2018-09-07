import React, { Component } from 'react';
import { Alert, Well, Button, ButtonGroup, Modal, Panel } from 'react-bootstrap';
import swal from 'sweetalert';

class Meals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meal_id: null,
      name: null,
      description: null,
      price: null,
      meals: [],
      show_modal: false,
      alert: null,
    }
  }

  componentDidMount() {
    this.getMeals()
  }

  handleChange = (event) => {
    // update user input into state
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  getMeals = () => {
    // do a fetch request to get all meals
    const access_token = sessionStorage.getItem('access_token')
    const url = 'https://bookameal-staging.herokuapp.com/api/v2/meals'

    fetch(url, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: access_token,
      },
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 401) {
          this.setState({ error: 'Ooops, this is a restricted area.' })
        }
        return response.json()
      })
      .catch(error => console.error('Error: ', error))
      .then((response) => {
        this.setState({
          meals: response.meals,
        })
      })
  }

  createMeal = (event) => {
    // send a request to create new meal
    event.preventDefault();
    const access_token = sessionStorage.getItem('access_token')
    const { name, price, description } = this.state
    const url = 'https://bookameal-staging.herokuapp.com/api/v2/meals'
    // confirm user action
    swal({
      title: 'Are you sure you want to create a new meal?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          const data = { name: name, price: price, description: description }
          fetch(url, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: access_token,
            },
            method: 'POST',
            mode: 'cors',
          })
            .then(response => response.json())
            .catch(error => console.error('Error: ', error))
            .then((response) => {
              this.setState({
                name: null,
                meal_id: null,
                description: null,
                price: null,
                alert: response.message,
                show_modal: false,
              })
            })
            .then(response => this.getMeals())
        } else {
          swal('Create meal operation aborted succesfully');
          this.setState({ show_modal: false })
        }
      })
  }

  addToMenu = (e) => {
    // add meal to menu
    e.preventDefault()
    const meal_id = e.currentTarget.dataset.id
    const url = 'https://bookameal-staging.herokuapp.com/api/v2/menu'
    const access_token = sessionStorage.getItem('access_token')
    // confirm user action
    swal({
      title: `Are you sure you want to add meal #${meal_id} to Menu?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          // request user to enter date
          swal({
            text: 'Enter date(DD-MM-YYYY):',
            content: 'input',
            button: {
              text: 'Send!',
              closeModal: false,
            },
          }).then((date) => {
            if (date) {
              const data = { meal_list: [parseInt(meal_id, 10)], date: date }
              fetch(url, {
                body: JSON.stringify(data),
                headers: {
                  'content-type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  Authorization: access_token,
                },
                method: 'POST',
                mode: 'cors',
              })
                .then(response => response.json())
                .catch(error => console.error(error))
                .then((response) => {
                  if (response.message) {
                    swal(response.message)
                  } else {
                    swal(`Error: ${response.error}`)
                  }
                })
            } else {
              swal('Meal HAS NOT been added to menu!')
            }
          })
        } else {
          swal('Meal HAS NOT been added to menu!')
        }
      })
  }

  showDetail = (e) => {
    // display modal to show current meal details
    e.preventDefault()
    const { id, name, description, price } = e.currentTarget.dataset
    const meal_id = id
    const meal_name = name

    this.setState({
      meal_id: meal_id,
      name: meal_name,
      description: description,
      price: price,
      show_modal: true,
    })
  }

  Meal = (meal) => {
    // create a panel for meal passed
    const meal_item = meal.meal
    const { meal_id, name, description, price } = meal_item
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Meal { meal_id }</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="row">
            <div className="col-md-2">{ name }</div>
            <div className="col-md-5">{ description }</div>
            <div className="col-md-2">Kes {price}.00</div>
            <ButtonGroup>
              <Button onClick={this.showDetail} bsStyle="primary" data-id={meal_id} data-price={price} data-name={name} data-description={description}>
                Details
              </Button>
              <Button onClick={this.addToMenu} bsStyle="primary" data-id={meal_id}>
                Add To Menu
              </Button>
            </ButtonGroup>
          </div>
        </Panel.Body>
      </Panel>
    )
  }

  displaymeals = () => {
    // display meals using the Meal function
    const { meals } = this.state
    const mealNode = meals.map(meal => (
      <this.Meal meal={meal} key={meal.meal_id} />))
    return (
      <Well>
        { this.showAlert() }
        { mealNode }
      </Well>
    );
  }

  handleCloseModal = () => {
    // close the detail/create view modal
    this.setState({ show_modal: false })
  }

  deleteMeal = (event) => {
    // function to delete a meal, only deletes meals that are not attached to any orders yet
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    const { meal_id } = this.state
    swal({
      title: `Are you sure you want to delete this meal #${meal_id}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        // check if user confirmed to delete
        if (willDelete) {
          if (meal_id) {
            const url = `https://bookameal-staging.herokuapp.com/api/v2/meals/${meal_id}`
            fetch(url, {
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: access_token,
              },
              method: 'DELETE',
              mode: 'cors',
            })
              .then(response => response.json())
              .catch(error => console.error('Error: ', error))
              .then((response) => {
                this.setState({
                  meal_id: null,
                  name: null,
                  description: null,
                  price: null,
                  show_modal: false,
                  alert: response.message,
                })
              })
              .then(response => this.getMeals())
          } else {
            // if meal_id has not been provided
            this.setState({ alert: 'Sorry, Cannot delete non-existent meal' })
          }
          swal('Poof! The Meal has been deleted', {
            icon: 'success',
          });
        } else {
          swal('Meal had not been deleted')
          this.setState({ show_modal: false })
        }
      })
  }

  editMeal = (event) => {
    // function to edit a meal
    event.preventDefault()
    const access_token = sessionStorage.getItem('access_token')
    const { meal_id, name, description, price } = this.state
    swal({
      title: `Are you sure you want to edit this meal #${meal_id}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willEdit) => {
        // check willedit true
        if (willEdit) {
          if (meal_id) {
            const data = {
              name: name,
              description: description,
              price: price }
            const url = `https://bookameal-staging.herokuapp.com/api/v2/meals/ ${meal_id}`
            fetch(url, {
              body: JSON.stringify({ new_data: data }),
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: access_token,
              },
              method: 'PUT',
              mode: 'cors',
            })
              .then(response => response.json())
              .catch(error => console.error('Error: ', error))
              .then((response) => {
                this.setState({
                  meal_id: null,
                  name: null,
                  description: null,
                  price: null,
                  show_modal: false,
                  alert: response.message,
                })
              })
              .then(response => this.getMeals())
          } else {
            this.setState({ alert: 'Sorry, Cannot edit non-existent meal' })
          }

          swal('OK! The Meal has been edited!', {
            icon: 'success',
          })
        } else {
          // if user cancels edit operation
          swal('Meal has not been edited');
          this.setState({ show_modal: false })
        }
      })
  }

  showAlert = () => {
    // render alert in state if it exists
    const { alert } = this.state
    if (alert) {
      return (
        <Alert onDismiss={this.dismissAlert}>{alert}</Alert>
      )
    }
    return null
  }

  dismissAlert = () => {
    // stop displaying any alerts in state
    this.setState({ alert: null })
  }

  render = () => {
    const { error, meal_id, show_modal, name, description, price } = this.state
    // check if there is an error and display
    if (error) {
      return (
        <div className="w3-display-middle">
          <p>{ error }</p>
        </div>
      )
    }
    let buttons = '';

    if (meal_id) {
      // buttons for modal detail view
      buttons = (
        <ButtonGroup>
          <Button onClick={this.editMeal} bsStyle="primary">EDIT</Button>
          <Button onClick={this.deleteMeal} bsStyle="danger">DELETE</Button>
        </ButtonGroup>

      )
    } else {
      // buttons for modal create view
      buttons = (
        <Button onClick={this.createMeal} bsStyle="primary">CREATE</Button>
      )
    }

    return (
      <div>
        <div className="w3-cell-row">
          <h2 className="w3-conatiner w3-cell">Meals</h2>
          <ButtonGroup>
            <Button className="w3-container w3-cell" bsStyle="primary" onClick={this.showDetail} bsSize="lg">CREATE A NEW MEAL</Button>
          </ButtonGroup>
        </div>
        <div>
          <this.displaymeals />
        </div>
        <Modal show={show_modal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title><span>MEAL DETAILS </span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-group">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" id="name" name="name" value={name} onChange={this.handleChange} type="text" placeholder="Meal Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <br />
                <textarea className="form-control" id="description" name="description" value={description} onChange={this.handleChange} placeholder="Enter description here" required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input className="form-control" name="price" placeholder="0.00" value={price} onChange={this.handleChange} type="number" min="0.00" required />
              </div>
              {buttons}
              <div>
                <span>
                  <strong>NB:</strong>
                  <p>Meals with Orders attached cannot be deleted!</p>
                </span>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Meals;
