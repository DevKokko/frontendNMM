import React from 'react';
import { connect } from 'react-redux';
//import './Datatable.css'

//const $ = require('jquery');
//$.DataTable = require('datatables.net');

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-responsive-dt'
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

var table;

class Datatable extends React.Component {

    componentDidMount() {
        if(this.props.body.length > 0){
            table = $(this.refs.main).DataTable( {
                data: this.props.body,
                responsive: true,
                order: [[ 1, "desc" ]],
                columns: this.props.header.map(header => {
                    return {title: header};
                })
            } );
        }
    }
    componentWillUnmount(){
       table.destroy(true);
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.reloadTableData(nextProps);
        return false;
    }

    reloadTableData = (newData) => {
        if(table){
            table.clear();
            table.rows.add(newData.body);
            table.draw(false);
        }
        else{
            console.log(newData);
            table = $(this.refs.main).DataTable( {
                data: newData.body,
                responsive: true,
                order: [[ 2, "desc" ], [ 1, "asc" ]],
                columns: newData.header.map(header => {
                    return {title: header};
                })
            } );
        }
    }

    render() {
        return (
            <div>
                <table className="display" ref="main" />
            </div>);
    }

}

const mapStateToProps = state => {
    return {
        isAuthed : state.auth.token ? true : false,
        username : state.auth.username,
        userId : state.auth.userId
    }
}

export default connect( mapStateToProps )( Datatable ) ;
