import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component{


  render(){
    return(
      <Layout className="layout">
        <Header>
        {

          this.props.isAuthenticated ?

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

        </Header>

        <Content style={{ padding: '0 50px' }}>

          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          { this.props.children }

          </div>

        </Content>


        <Footer style={{ textAlign: 'center' }}>
          BusinessDock ©2018 Created by Mateo Sixtos
        </Footer>
      </Layout>

    );

  }
}


const mapDispatchToProps = dispatch =>{
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null,  mapDispatchToProps)(CustomLayout));
