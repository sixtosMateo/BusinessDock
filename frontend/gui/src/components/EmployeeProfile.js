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
import { List, Icon, Row, Col } from 'antd';

class EmployeeProfile extends React.Component{

  state ={
    query:  '',
    combinedEmployee:[]
  }

  updateQuery=(query)=>{

  }

  componentDidMount(){
      this.props.refreshEmployees();
      this.props.refreshUsers();

}

  render(){

      return(

        <div className="employee-profile">
          <h1>Employee:</h1>
          <Row className="employee-convas">
            <Col className="employee-info">

            </Col>
            <Col className="graph-data">

            </Col>

          </Row>

          <h2>Transactions</h2>
          <Row className="transactions-convas">
          </Row>

        </div>
      )

  }


}


const mapStateToProps = ({EmployeeReducer, UserReducer}, props) =>{
  // return object is what you want to map into a property
  return {
    employees: EmployeeReducer.employees,
    users: UserReducer.users,
    employee: EmployeeReducer.employees.find((employee) =>
          employee.employeeId === parseInt(props.match.params.employeeId)),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
      refreshUsers: () => dispatch(actions.reloadLocalUsers())

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EmployeeProfile));
