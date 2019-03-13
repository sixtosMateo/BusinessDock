// new item or edit employee change state
// when logging in the employees dont display employees
// maybe for the combinedEmployee state array

import React from 'react';
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
    query:  '',
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }

  componentDidMount(){
    this.props.refreshEmployees();
    this.props.refreshUsers();
    this.props.refreshEmployeeCombo();
  }

  render(){
    let showingEmployees
    const { combinedEmployee } = this.props
      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingEmployees = combinedEmployee.filter((employee) =>
        match.test(employee.employeeId))
      }
      else{
        showingEmployees = combinedEmployee
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


const mapStateToProps = ({EmployeeReducer, UserReducer, CombinedEmployee}) =>{
  // return object is what you want to map into a property
  return {
    combinedEmployee: CombinedEmployee.combinedEmployee
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
      refreshUsers: () => dispatch(actions.reloadLocalUsers()),
      refreshEmployeeCombo: () => dispatch(actions.reloadEmployeeCombo()),

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Employee));
