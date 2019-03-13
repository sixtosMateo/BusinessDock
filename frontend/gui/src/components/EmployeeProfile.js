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
import TransactionHeaders from './avatar/TransactionHeaders';
import { List, Icon, Row, Col } from 'antd';

import axios from 'axios';

class EmployeeProfile extends React.Component{

  state ={
    query:  '',
    data:[],
    items:[]
  }

  componentDidMount(){
      this.props.refreshEmployees();
      this.props.refreshUsers();
      this.props.refreshEmployeeCombo();
      this.outgoingTransaction()

}

  outgoingTransaction(){

    axios.get(`http://127.0.0.1:8000/api/outgoingTransactionById/${parseInt(this.props.match.params.employeeId)}/`)
      .then((res) =>
        this.setState({
          data: res.data
        })
      )
      .catch(e=>{
        console.log(e)
      })

}

  getOutgoingItems=(id)=>{
    axios.get(`http://127.0.0.1:8000/api/outgoingtransactionItem/${id}/`)
      .then((res) =>
        this.setState({
          items: res.data
        })
      )
      .catch(e=>{
        console.log(e)
      })

  }

  render(){

      const {employee} = this.props
      console.log(this.state.data)
      return(

        <div className="employee-profile">
          <h1>Employee: {employee ? employee.first_name: ""} {employee ? employee.last_name: ""}</h1>

          <Row className="employee-convas">
            <Col md={12} lg={12} className="employee-info">
              <Row className="employee" style={{border:"solid 1px"}}>
                <Col>
                  <strong>Username: </strong> {employee ? employee.username: ""}
                </Col>
                <Col>
                  <strong>Employee ID: </strong> {employee ? employee.employeeId: ""}
                </Col>
                <Col>
                  <strong>Phone Number: </strong> (831) 585-0879
                </Col>
                <Col>
                  <strong>Email: </strong> {employee ? employee.email: ""}
                </Col>
              </Row>

              <Row className="transaction" style={{border:"solid 1px", background:"#E0E0E0"}}>
                <Col>
                  <strong>Overall Transactions Qty: </strong> 3
                </Col>
                <Col>
                  <strong>Total Sales: </strong> 120.18
                </Col>
                <Col>
                  <strong>Investment Purchases: </strong> 60.09
                </Col>
              </Row>
            </Col>

            <Col md={12} lg={12}  className="graph-data">
              <img style={{margin:"0", padding:"0", width:"100%", height:"165px"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            </Col>
          </Row>

          <h2>Transactions</h2>

          <TransactionHeaders/>
          <Row className="transactions-convas">
            <EmployeeOutgoingAvatar
              data={this.state.data}
              getTransactionItems={this.getTransactionItems}
              getOutgoingItems={this.getOutgoingItems}/>

            {this.state.items.length > 0
                ?
                "hello"
                :""
              }

          </Row>


        </div>
      )

  }


}


const mapStateToProps = ({CombinedEmployee}, props) =>{
  // return object is what you want to map into a property
  return {
    combinedEmployee: CombinedEmployee.combinedEmployee,
    employee: CombinedEmployee.combinedEmployee.find((employee) =>
          employee.employeeId === parseInt(props.match.params.employeeId)),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshEmployeeCombo: () => dispatch(actions.reloadEmployeeCombo()),
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
      refreshUsers: () => dispatch(actions.reloadLocalUsers())

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EmployeeProfile));
