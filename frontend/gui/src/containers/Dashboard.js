import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import * as actions from '../store/actions/auth';


class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard">

          {this.props.isAuthenticated ?

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">BusinessDock</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/outgoing/">Outgoing</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/incoming/">Incoming</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/employees/">Employees</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/inventory/">Inventory</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/vendors/">Vendors</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/reports/">Reports</Link></Menu.Item>
            <Menu.Item key="8" onClick={ this.props.logout} style={{ float:'right'}}>
              <Link to="/">logout</Link>
            </Menu.Item>
          </Menu>

          :

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">BusinessDock</Link></Menu.Item>
            <Menu.Item key="8" style={{ float:'right'}}>
                  <Link to="/login/">Login</Link>
              </Menu.Item>
          </Menu>

        }

      </div>
    );
  }

}

  const mapStateToProps = state =>{
    // return object is what you want to map into a property
    return{
      isAuthenticated: state.token !== null
    }
  }

  //on object we specify the property that we want to reference
  // onTryAutoSignUp is a dispatch
  const mapDispatchToProps = dispatch =>{
    return {
        onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
        logout: () => dispatch(actions.logout())
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Dashboard));
