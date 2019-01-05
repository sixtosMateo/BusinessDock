// bug: componentWillReceiveProps(props) is being called twice therefore two calls to server
// create a cached that check whether the query was called or not

import React from 'react';
import axios from 'axios';
import { List, Input, Breadcrumb, Avatar, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'

import EmployeeAvatar from './EmployeeAvatar';


const Search = Input.Search;

class Employee extends React.Component{

  constructor(props) {
       super(props);
       
       this.employees = this.componentWillReceiveProps(props);
     }

  state ={
    employees:[],
    query:  ''
  }

  updateQuery=(query)=>{
  this.setState({
    query: query.trim()
  })
}

  componentWillReceiveProps(newProps){
    console.log("called");
    if(newProps.token){
      axios.defaults.headers = {
         "Content-Type": "application/json",
         Authorization: newProps.token,

      }

      axios.get('http://127.0.0.1:8000/api/employees/')
        .then(res => {
          this.setState({
            employees: res.data
          });
        })
    }


  }

  render(){
    let showingEmployees

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingEmployees = this.state.employees.filter((employee) =>
        match.test(employee.employeeId))
      }
      else{
        showingEmployees = this.state.employees
      }

      showingEmployees.sort(sortBy('employeeId'))

      return(

        <div className="employeeComponent">
        <Search
          placeholder="Search Employee"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
          />


          <EmployeeAvatar data={showingEmployees} />
        </div>
      )

  }


}


const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}


export default withRouter(connect(mapStateToProps)(Employee));
