import React from 'react'
import {
  HashRouter as Router, Route, Switch, Link, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, Alert } from 'antd';



class Submenu extends React.Component{
  renderSubmenu() {
    const { location } = {...this.props}
    const pathSnippets = location.pathname.split('/').filter(i => i);


    if(pathSnippets === "login"){
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>Please login</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if(pathSnippets.includes("outgoing")){
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/outgoing/editTransaction/">Edit Transaction</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/outgoing/deleteTransaction/">Delete Transaction</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if (pathSnippets.includes("incoming")){
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/incoming/newItem/">New Item</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/incoming/newVendor/">New Vendor</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/incoming/editTransaction/">Edit Transaction</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/incoming/deleteTransaction/">Delete Transaction</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if (pathSnippets.includes("employees")) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/employees/">All</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/employees/newEmployee/">New Employee</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    else if (pathSnippets.includes('inventory')) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/inventory/">Item</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/inventory/newItem/">New Item</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/inventory/countCycle/">Count Cyle</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/inventory/damageItem/">Damage Item</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    else if (pathSnippets.includes('vendors')) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/vendors/">All</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/vendors/newVendor/">New Vendor</Link></Breadcrumb.Item>

        </Breadcrumb>
      )
    }

    else if (pathSnippets.includes("reports")) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/reports/pdf/">PDF</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/reports/graphs/">Graphs</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/reports/">TBH</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/reports/">TBH</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }else{

        return(
          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item><Link to="/">Overview</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/demo/">Demo</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/client/">Client</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/contact/">Contact</Link></Breadcrumb.Item>
          </Breadcrumb>
        )

    }

  }

  render(){
      return(
        <div className="submenuComponent">
          { this.renderSubmenu() }
        </div>


      );
  }

}

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}


export default withRouter(connect(mapStateToProps)(Submenu));
