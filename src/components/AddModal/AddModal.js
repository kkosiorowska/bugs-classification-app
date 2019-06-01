    
import React, { Component } from 'react';

import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

class AddModal extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    } 
    
    handleClose() {
        this.setState({ show: false });
    }
    
      handleShow() {
        this.setState({ show: true });
    }

    render (){
        return (
            
        <div>

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

export default AddModal;