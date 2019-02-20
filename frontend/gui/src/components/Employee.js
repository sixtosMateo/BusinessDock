// new item or edit employee change state 

import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import EmployeeAvatar from './avatar/EmployeeAvatar';


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

  componentDidMount(){
      this.props.refreshEmployees();
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

const mapDispatchToProps = dispatch =>{
  return {
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Employee));
