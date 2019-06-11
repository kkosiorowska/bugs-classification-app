    
import React, { Component } from 'react';

import './Layout.css';
import axios from 'axios';
import Information from './../Information/Information';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



function buttonFormatter(cell, row){
    return '<BootstrapButton type="submit"></BootstrapButton>';
  }


//https://alligator.io/react/axios-react/

const cellEditProp = {
    //https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditonstartedit-function
    mode: 'dbclick',
    blurToSave: true,
    beforeSaveCell: (oldValue, newValue, row, column) => { 

        const rule = {
            name: oldValue["employee"],
            word: oldValue["key"],
            predicament: oldValue["predicament"],
            certainty: oldValue["certainty"]
        }
        axios.post(`http://localhost:8080/RestExample/resources/clips/delete`, rule)
        .then(res => {
        })
    },
    afterSaveCell: (oldValue, newValue, row, column) => { 
        const rule = {
            name: oldValue["employee"],
            word: oldValue["key"],
            predicament: oldValue["predicament"],
            certainty: oldValue["certainty"]
        }

        if(newValue === "employee") rule["name"] = row;
        if(newValue === "word") rule["key"] = row;

        axios.post(`http://localhost:8080/RestExample/resources/clips/post`, rule)
        .then(res => {
        })
    }
};


class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rules: [],
            idx: 1
        };

        this.getData = this.getData.bind(this);
    } 
    
    componentDidMount() {

        this.getData();
    }

    getData(){
        axios.get(`http://156.17.41.242:8085/RestApi/resources/clips/rules`)
        .then(res => {
            console.log(res);
            const results= res.data.map(row => ({
                key: this.state.idx++, 
                employee: row.name,
                key: row.word,
                predicament: row.predicament,
                certainty: row.certainty
              }))
          this.setState({ rules: results });
            
        })
    }

    onAfterInsertRow(row) {
        
        //row["id"] = this.state.idx++;
    
        const rule = {
            name: row["employee"],
            word: row["key"],
            predicament: "default",
            certainty: row["certainty"]
        }

        axios.post(`http://localhost:8080/RestExample/resources/clips/post`, rule)
        .then(res => {
        })
    }

    onClickRowSelected(cell, row, rowIndex){
        console.log(row);

        const rule = {
            name: row["employee"],
            word: row["key"],
            predicament: row["predicament"],
            certainty: row["certainty"]
        }
        axios.post(`http://localhost:8080/RestExample/resources/clips/delete`, rule)
        .then(res => {
        })

        window.location.reload();
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <Button variant="danger" onClick={() => this.onClickRowSelected(cell, row, rowIndex)}>Delete</Button>
        )
     }

    render (){

        const options = {
            afterInsertRow: this.onAfterInsertRow   // A hook for after insert rows
        };

        return (
            
        <div className="Layout">

            <Information/>
            <br/><br/><br/>
            <BootstrapTable 
                data={ this.state.rules }
                insertRow = {true}
                options={ options }
                cellEdit={ cellEditProp }
                pagination
                striped
                hover
                condensed >
                {/* <TableHeaderColumn dataField="key" isKey dataAlign="center" dataSort editable={ false }>Id</TableHeaderColumn> */}
                <TableHeaderColumn dataField="employee" dataAlign="center" dataSort filter={ { type: 'TextFilter' } }>Employee</TableHeaderColumn>
                <TableHeaderColumn dataField="key"  isKey dataAlign="center" dataSort filter={ { type: 'TextFilter' } }>Word</TableHeaderColumn>
                <TableHeaderColumn dataField="certainty" dataAlign="center" dataSort filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>','<', '<=', '>=' ] } }>Certainty</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataAlign="center" editable={ false } width={'10%'} dataFormat={this.cellButton.bind(this)}/>
            </BootstrapTable>

        </div>

        );
    }
}

export default Layout;