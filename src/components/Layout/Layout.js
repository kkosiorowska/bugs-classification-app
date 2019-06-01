    
import React, { Component } from 'react';

import './Layout.css';
import axios from 'axios';
import Information from './../Information/Information';
import AddModal from './../AddModal/AddModal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Modal, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const cellEditProp = {
    mode: 'dbclick',
    blurToSave: true
};


class Layout extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            rules: [],
            idx: 1
        };

        this.getData = this.getData.bind(this);
    } 
    
    handleClose() {
        this.setState({ modalShow: true });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {

        this.getData();
    }

    getData(){
        axios.get(`http://localhost:8080/RestExample/resources/clips/rules`)
        .then(res => {
            const results= res.data.map(row => ({
                key: this.state.idx++, 
                name: row.attrName2,
                value: row.attr2,
                certainty: row.certainty
              }))
          this.setState({ rules: results });
            
        })
    }

    render (){

        return (
            
        <div className="Layout">

            <Information/>
            <br/><br/>
            <Button className="addBtn" variant="info" onClick={this.handleShow}> Add new rule </Button>
            <br/><br/>
            <BootstrapTable 
                data={ this.state.rules }
                pagination
                striped
                hover
                condensed >

                <TableHeaderColumn dataField="key" isKey dataAlign="center" editable={ false }>Id</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataAlign="center" dataSort cellEdit={ cellEditProp }>Rule Name</TableHeaderColumn>
                <TableHeaderColumn dataField="value" dataAlign="center" cellEdit={ cellEditProp }>Value</TableHeaderColumn>
                <TableHeaderColumn dataField="certainty" dataAlign="center" dataSort cellEdit={ cellEditProp }>Certainty</TableHeaderColumn>
            </BootstrapTable>


            <Modal style={{opacity:1}} show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new rule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formRuleName">
                        <Form.Label>Rule name</Form.Label>
                        <Form.Control type="input" placeholder="Enter rule name" />
                    </Form.Group>
                    <Form.Group controlId="formValue">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="input" placeholder="Value" />
                    </Form.Group>
                    <Form.Group controlId="formCertainty">
                        <Form.Label>Certainty</Form.Label>
                        <Form.Control type="input" placeholder="Certainty" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>


        );
    
    }
}

export default Layout;