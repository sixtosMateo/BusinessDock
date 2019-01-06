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
    if(pathSnippets == "login"){
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>Please login</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if(pathSnippets == "outgoing"){
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="./editTransaction/">Edit Transaction</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./deleteTransaction/">Delete Transaction</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if (pathSnippets == "incoming") {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="./newItem/">New Item</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./newVendor/">New Vendor</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./editTransaction/">Edit Transaction</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./deleteTransaction/">Delete Transaction</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    else if (pathSnippets.includes("employees")) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="./">All</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./newEmployee">New Employee</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    else if (pathSnippets.includes('inventory')) {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="./newItem/">New Item</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./countCyle/">Count Cyle</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="./damageItem/">Damage Item</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    else if (pathSnippets == "vendors") {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/newVendor/">New Vendor</Link></Breadcrumb.Item>

        </Breadcrumb>
      )
    }

    else if (pathSnippets == "reports") {
      return(
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item><Link to="/pdf/">PDF</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/graphs/">Graphs</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">TBH</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">TBH</Link></Breadcrumb.Item>
        </Breadcrumb>
      )
    }else{

        return(
          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item><Link to="/overview/">Overview</Link></Breadcrumb.Item>
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
