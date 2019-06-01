    
import React, { Component } from 'react';

import './Layout.css';
import axios from 'axios';
import Information from './../Information/Information';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rules: []
        };

        this.getData = this.getData.bind(this);
    }    

    componentDidMount() {

        this.getData();
    }

    getData(){
        var idx = 0;
        axios.get(`http://localhost:8080/RestExample/resources/clips/rules`)
        .then(res => {
            const results= res.data.map(row => ({
                key: idx++, 
                name: "name test",
                attrName1: row.attrName1,
                attr1: row.attr1,
                attrName2: row.attrName2,
                attr2: row.attr2,
                certainty: row.certainty
              }))
          this.setState({ rules: results });
            
        })
    }

    render (){

        return (
        <div className="Layout">

            <Information/>
            <br/><br/><br/>
            <BootstrapTable 
            data={this.state.rules}
            remote
            pagination
            striped
            hover
            condensed >
                <TableHeaderColumn dataField="key" isKey dataAlign="center">Id</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataAlign="center">Rule Name</TableHeaderColumn>
                <TableHeaderColumn dataField="attrName1" dataAlign="center">attrName1</TableHeaderColumn>
                <TableHeaderColumn dataField="attr1" dataAlign="center">attr1</TableHeaderColumn>
                <TableHeaderColumn dataField="attrName2" dataAlign="center">attrName2</TableHeaderColumn>
                <TableHeaderColumn dataField="attr2" dataAlign="center">attr2</TableHeaderColumn>
                <TableHeaderColumn dataField="certainty" dataAlign="center">Certainty</TableHeaderColumn>
            </BootstrapTable>

        </div>

        );
    
    }
}

export default Layout;