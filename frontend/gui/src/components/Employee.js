// new item or edit employee change state
// when logging in the employees dont display employees
// maybe for the combinedEmployee state array

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
    query:  '',
    combinedEmployee:[]
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }

  componentDidMount(){

      this.props.refreshEmployees();
      this.props.refreshUsers();
      this.setCombinedEmployees();


}

  setCombinedEmployees(){
    let tempArray = [...this.props.employees]

    this.props.users.forEach((user)=>{
     const matchEmployee = this.props.employees.find(employee => employee.userId === user.id)
     const index = tempArray.indexOf(matchEmployee)
     const item = tempArray[index]

     item.first_name = user.first_name
     item.last_name = user.last_name
     item.username = user.username
     item.email = user.email
     item.is_staff = user.is_staff
     item.date_joined = user.date_joined



     this.setState(() => {
       return {combinedEmployee:[...tempArray]}
      })
  })
}



  render(){
    let showingEmployees

    const { combinedEmployee } = this.state
    console.log(combinedEmployee)
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


const mapStateToProps = ({EmployeeReducer, UserReducer}) =>{
  // return object is what you want to map into a property
  return {
    employees: EmployeeReducer.employees,
    users: UserReducer.users
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
      refreshUsers: () => dispatch(actions.reloadLocalUsers())

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Employee));
