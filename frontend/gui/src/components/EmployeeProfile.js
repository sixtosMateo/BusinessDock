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
import EmployeeOutgoingAvatar from './avatar/EmployeeOutgoingAvatar';
import { List, Icon, Row, Col } from 'antd';

import axios from 'axios';

class EmployeeProfile extends React.Component{

  state ={
    query:  '',
    user:{},
    data:[]
  }

  updateQuery=(query)=>{

  }

  componentDidMount(){


      this.outgoingTransaction()
      this.props.refreshEmployees();
      this.props.refreshUsers();
      const user = this.props.users.find((user) =>
            user.id === this.props.employee.userId)
      this.setState({
        user:user
      })
}

outgoingTransaction(){
  axios.get(`http://127.0.0.1:8000/api/outgoingTransactionById/${this.props.employee.employeeId}/`)
    .then((res) =>
      this.setState({
        data: res.data
      })
    )
    .catch(e=>{
      console.log(e)
    })



}

  render(){

      const {user} = this.state
      return(

        <div className="employee-profile">
          <h1>Employee: {user ? user.first_name: ""} {user ? user.last_name: ""}</h1>

          <Row className="employee-convas">
            <Col md={12} lg={12} className="employee-info">
              <Row className="employee" style={{border:"solid 1px"}}>
                <Col>
                  Username:
                  {user ? user.username: ""}
                </Col>
                <Col>
                  Employee ID:
                  {this.props.employee.employeeId}
                </Col>
                <Col>
                  Phone Number: (831) 585-0879
                </Col>
                <Col>
                  Email: {user ? user.email: ""}
                </Col>
              </Row>

              <Row className="transaction" style={{border:"solid 1px"}}>
                <Col>
                  Overall Transactions qty: 3
                </Col>
                <Col>
                  Total Sales: 120.18
                </Col>
                <Col>
                  Investment Purchases: 60.09
                </Col>
              </Row>
            </Col>

            <Col md={12} lg={12}  className="graph-data">
              <img style={{margin:"0", padding:"0", width:"100%", height:"165px"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            </Col>
          </Row>

          <h2>Transactions</h2>
          <Row className="transactions-convas">
            <EmployeeOutgoingAvatar data={this.state.data}/>
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
