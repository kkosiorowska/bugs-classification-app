    
import React, { Component } from 'react';

import './Layout.css';
import axios from 'axios';
import Information from './../Information/Information';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//https://alligator.io/react/axios-react/

const cellEditProp = {
    //https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditonstartedit-function
    mode: 'dbclick',
    blurToSave: true,
    beforeSaveCell: (oldValue, newValue, row, column) => { 

        const rule = {
            name: oldValue["employee"],
            word: oldValue["word"],
            predicament: oldValue["predicament"],
            certainty: oldValue["certainty"]
        }
        axios.post(`http://156.17.41.242:8085/RestApi/resources/clips/delete`, rule)
        .then(res => {
        })
    },
    afterSaveCell: (oldValue, newValue, row, column) => { 
        const rule = {
            name: oldValue["employee"],
            word: oldValue["word"],
            predicament: oldValue["predicament"],
            certainty: oldValue["certainty"]
        }

        if(newValue === "employee") rule["name"] = row;
        //if(newValue === "word") rule["key"] = row;

        axios.post(`http://156.17.41.242:8085/RestApi/resources/clips/post`, rule)
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
    // wyswietlanie
    getData(){
        axios.get(`http://156.17.41.242:8085/RestApi/resources/clips/rules`)
        .then(res => {

            if(res.data != null){
                const results= res.data.rule.map(row => ({
                    key: this.state.idx++, 
                    employee: row.name,
                    word: row.word,
                    predicament: row.predicament,
                    certainty: row.certainty
                  }))
              this.setState({ rules: results });
            }
            
        })
    }
    // dodawanie
    onAddRow(row) {

        //if(row["employee"]!=="" && row["word"]!=="" && row["certainty"]!==""){
            const rule = {
                name: row["employee"],
                word: row["word"],
                predicament: "default",
                certainty: row["certainty"]
            }
    
            console.log(rule);
    
            axios.post(`http://156.17.41.242:8085/RestApi/resources/clips/post`, rule)
            .then(res => {
            })
    
           //window.location.reload();
        //}
      }

    // usuwanie 
    onClickRowSelected(cell, row, rowIndex){
        console.log(row);

        const rule = {
            certainty: row["certainty"],
            name: row["employee"],
            word: row["word"],
            predicament: row["predicament"]
        }

        console.log(rule);
        axios.post(`http://156.17.41.242:8085/RestApi/resources/clips/delete`, rule)
        .then(res => {
            console.log(res);
        })

      // window.location.reload();
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <Button variant="danger" onClick={() => this.onClickRowSelected(cell, row, rowIndex)}>Delete</Button>
        )
     }
     
    render (){

        const options = {
            onAddRow: this.onAddRow 
        };

        return (
            
        <div className="Layout">

            <Information/>
            <br/><br/><br/>
            <BootstrapTable 
                data={ this.state.rules }
                insertRow = { true }
                options={ options }
                cellEdit={ cellEditProp }
                pagination
                striped
                hover
                condensed >
                <TableHeaderColumn dataField="key" isKey dataAlign="center" dataSort editable={ false }>Id</TableHeaderColumn>
                <TableHeaderColumn dataField="employee" dataAlign="center" dataSort filter={ { type: 'TextFilter' } }>Employee</TableHeaderColumn>
                <TableHeaderColumn dataField="word" dataAlign="center" dataSort filter={ { type: 'TextFilter' } }>Word</TableHeaderColumn>
                <TableHeaderColumn dataField="certainty" dataAlign="center" dataSort filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>','<', '<=', '>=' ] } }>Certainty</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataAlign="center" editable={ false } width={'10%'} dataFormat={this.cellButton.bind(this)}/>
            </BootstrapTable>

        </div>

        );
    }
}

export default Layout;