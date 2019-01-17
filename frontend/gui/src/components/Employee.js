// bug: componentWillReceiveProps(props) is being called twice therefore two calls to server
// create a cached that check whether the query was called or not

import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'

import EmployeeAvatar from './EmployeeAvatar';


const Search = Input.Search;

class Employee extends React.Component{

  state ={
    query:  ''
  }

  updateQuery=(query)=>{
  this.setState({
    query: query.trim()
  })
}



  render(){
    let showingEmployees
    const { employees } = this.props
      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingEmployees = employees.filter((employee) =>
        match.test(employee.employeeId))
      }
      else{
        showingEmployees = employees
      }

      showingEmployees.sort(sortBy('employeeId'))

      return(

        <div className="employeeComponent">
        <Search
          placeholder="Search Employee"
          onClick={(event => event.target.select())}
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
    employees: state.employees
  }
}


export default withRouter(connect(mapStateToProps)(Employee));
