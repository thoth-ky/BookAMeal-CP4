import React, { Component } from 'react';


class Orders extends Component{
  constructor(props){
    super(props)
    this.state = {
      orders : '',
      admin_orders: ''
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

  displayOrders = (orders) =>{
    var markup = ''
    if (orders === '') {
      markup = "<div class='row'>Sorry, you don't seem to have any orders<p></p></div>"
    } else {
      for (var i in orders.orders) {
        if (orders.orders.hasOwnProperty(i)) {
          var order  = orders.orders[i]
          markup += "<div class='row'>"
          markup += "<div class='col-md-1'>"+ order.order_id +'</div>'
          markup += "<div class='col-md-1'>"+ order.time_ordered +'</div>'
          markup += "<div class='col-md-1'>"+ order.due_time +'</div>'
          markup += "<div class='col-md-1'>"+ order.owner +'</div>'
          markup += "<div class='col-md-6'>"
          for (var m in order.meals) {
            if (order.meals.hasOwnProperty(m)) {
              var meal = order.meals[m]
              markup += "<div id='meal' class=''>"
              markup += '<p>Meal' + m + 'Name: ' + meal.name + '</p>'
              markup += '<p>Quantity: ' + meal.quantity + '</p>'
              markup += '<p>Unit Price: ' + meal.unit_price + '</p>'
              markup += '<p>Caterer: ' + meal.caterer + '</p>'
              markup += "</div>"

            }
          }
          markup += "</div><div class='col-md-2'>" + order.total + "</div>"
          markup += '</div>'
        }
      }
    }
    var orders_markup = {__html: markup}
    return (<div dangerouslySetInnerHTML={orders_markup} />);
  }

  render = () => {
    let orders = this.state.orders;
    return(
      <div>
        <h2>My Orders</h2>
        <div id="orders" className="container">
          <div className="row" id="headings">
            <div className="col-md-1">Order ID</div>
            <div className="col-md-1">Time Ordered</div>
            <div className="col-md-1">Due Time</div>
            <div className="col-md-1">Ordered By</div>
            <div className="col-md-6">Order Details</div>
            <div className="col-md-2">Total Cost</div>
          </div>
          <this.displayOrders orders={ orders }/>
        </div>
      </div>
    )
  }

}


export default Orders;
