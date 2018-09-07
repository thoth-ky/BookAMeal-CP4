import React from 'react';
import { Link } from 'react-router-dom';
import { Well } from 'react-bootstrap';

// Page to be displayed in case of error 404
const NotFound = () => (
  <Well className="center">
    <h2>HTTP 404</h2>
    <h3>Sorry, this page was not found.</h3>
    <div>
      <p>Go back<Link className="links" to="/">Home</Link></p>
    </div>
  </Well>
);

export default NotFound;
