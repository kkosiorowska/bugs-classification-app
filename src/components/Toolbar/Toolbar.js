import React from 'react';

import './Toolbar.css';
import logo from './../../images/bug.png';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

const toolbar = (props) => (
    <div className="Toolbar">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#ruleMenagment"><img src={logo} alt="logo"/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="http://localhost:2990/jira/secure/Dashboard.jspa">Back to Jira</Nav.Link>
          <Nav.Link href="#ruleMenagment">Rule menagment</Nav.Link>
          <Nav.Link href="#logs">Logs</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
);

export default toolbar;