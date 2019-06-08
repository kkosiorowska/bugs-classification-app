    
import React, { Component } from 'react';

import './Layout.css';
import axios from 'axios';
import Information from './../Information/Information';
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
            word: oldValue["key"],
            predicament: oldValue["predicament"],
            certainty: oldValue["certainty"]
        }
        console.log(rule);
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

        if(newValue == "employee") rule["name"] = row;
        if(newValue == "word") rule["key"] = row;

    

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
        axios.get(`http://localhost:8080/RestExample/resources/clips/rules`)
        .then(res => {
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
            employee: row["employee"],
            key: row["key"],
            predicament: "",
            certainty: row["certainty"]
        }

        axios.post(`http://localhost:8080/RestExample/resources/clips/post`, rule)
        .then(res => {
        })
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
                insertRow={ true }
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
            </BootstrapTable>

        </div>

        );
    }
}

export default Layout;