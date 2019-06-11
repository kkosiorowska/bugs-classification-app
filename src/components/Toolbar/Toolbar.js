import React from 'react';

import './Toolbar.css';
import logo from './../../images/bug.png';
import { Navbar, Nav } from 'react-bootstrap';

const toolbar = (props) => (
    <div className="Toolbar">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#ruleMenagment"><img src={logo} alt="logo"/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="http://156.17.41.242:8080/secure/Dashboard.jspa">Back to Jira</Nav.Link>
          <Nav.Link href="#ruleMenagment" active>Rule menagment</Nav.Link>
          {/* <Nav.Link href="#logs">Logs</Nav.Link> */}
        </Nav>
      </Navbar>
    </div>
);

export default toolbar;