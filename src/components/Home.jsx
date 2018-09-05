import React from 'react';
import { Link } from 'react-router-dom';
import { Well } from 'react-bootstrap';

// Home page component
const Home = () => (
  <div>
    <div className="center">
      <h3>Welcome to Book A Meal</h3>
    </div>
    <div className="center">
      <Well>
        <span>
Go straight to the
          <Link className="links" to="/menu">Menu</Link>
?
        </span>
      </Well>
      <Well>
        <span>
Checkout my
          <Link className="links" to="/orders">Order History</Link>
?
        </span>
      </Well>
    </div>
  </div>
);


export default Home;
