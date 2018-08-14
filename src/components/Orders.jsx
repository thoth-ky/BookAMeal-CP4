import React, { Component } from 'react';
import { Well, Jumbotron, Panel, Modal, Button } from "react-bootstrap";
import { timeConverter } from "../common/helpers"

class Orders extends Component{
  constructor(props){
    super(props)
    this.state = {
      orders : '',
      admin_orders: '',
      show_modal: false
    }
    this.getOrders = this.getOrders.bind(this)
    this.makeOrder = this.makeOrder.bind(this)
    this.getOrders()
  }

  getOrders(){
    const access_token = sessionStorage.getItem('access_token')
    const url = '/api/v2/orders'
    // Do a fetch to get orders
    fetch(url,{
      headers: {
        'content-type': 'application/json',
        'Authorization': access_token,
        'Access-Control-Allow-Origin': "*",
      },
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .catch(error => console.error('Error: error'))
    .then(response => {
      console.log(response.message)
      this.setState({orders: response.orders, admin_orders: response.admin_orders})
    })
  }

  makeOrder(order){
    const access_token = sessionStorage.getItem('access_token')
    const url = '/api/v2/orders'
    const data = {'due_time':order.due_time, 'order': order.order_data}
    // make a post request to API
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Authorization': access_token,
        'Access-Control-Allow-Origin': "*",
      },
      method: 'POST',
      mode: 'cors'
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => {
      console.log(response.message);

    })
  }

  Meal = (meal) =>{
    let meal_item = meal.meal
    return (
      <Panel>
        <p>Meal Name: <strong>{ meal_item.name }</strong></p>
        <p>Quantity: <strong>{ meal_item.quantity }</strong></p>
        <p>Unit Price: <strong>{ meal_item.unit_price }</strong></p>
        <p>Sub Total: <strong>{ meal_item.sub_total }</strong></p>
      </Panel>
    )
  }

  Order = (order) =>{
    console.log(order.order)
    let order_item = order.order;

    let id = order_item.order_id;
    let time_ordered = timeConverter(order_item.time_ordered);
    let due_time = timeConverter(order_item.time_ordered);
    let meals = order_item.meals;
    let total = order_item.total;
    let owner = order_item.owner
    const mealNode = meals.map((meal) => {
      return (< this.Meal meal={ meal } />)
    })
    return (
      <Well>
        <div className="col-md-1">{ id }</div>
        <div className="col-md-2">{ time_ordered }</div>
        <div className="col-md-2">{ due_time }</div>
        <div className="col-md-1">{ owner }</div>
        <div className="col-md-2">{ total }</div>
        <Button onClick={this.showDetail}>Show Meals</Button>
          <Modal show={this.state.show_modal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title><span>Meals for Order { id }</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { mealNode}
            </Modal.Body>
          </Modal>
      </Well>)
  }
  showDetail = () =>{
    this.setState({show_modal:true})
  }

  handleCloseModal = () =>{
    this.setState({show_modal: false})
  }
  displayOrders = (orders) =>{
    try {
      let order_list = orders.orders
      const orderNode = order_list.map((order) => {
        return (< this.Order order={order}  />)
      })
      return (
        <div>
          <p>Dismissable Alert Box Here</p>
          { orderNode }
        </div>
      )
    } catch (e) {
      console.error('Err: ', e)
      return null
    }
  }

  render = () => {
    let orders = this.state.orders;
    return(
      <div>
        <h2>My Orders</h2>
        <Jumbotron>
          <Well className="row">
            <div className="col-md-1"><h4><b>ID</b></h4></div>
            <div className="col-md-2"><h4><b>Time Ordered</b></h4></div>
            <div className="col-md-2"><h4><b>Due Time</b></h4></div>
            <div className="col-md-1"><h4><b>Owner</b></h4></div>
            <div className="col-md-2"><h4><b>Total Cost</b></h4></div>
          </Well>
          <this.displayOrders orders={ orders }/>
        </Jumbotron>
      </div>
    )
  }

}


export default Orders;
