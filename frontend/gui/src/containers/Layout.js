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

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >

            <Menu.Item key="1"><Link to="/">BusinessDock</Link></Menu.Item>



            {

              this.props.isAuthenticated ?

                <Menu.Item key="8" onClick={ this.props.logout} style={{ float:'right'}}>
                  Logout
                </Menu.Item>
              :
                <Menu.Item key="8" style={{ float:'right'}}>
                  <Link to="/login/">Login</Link>
                </Menu.Item>
          }

          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>

        {

          this.props.isAuthenticated ?

          <Breadcrumb style={{ margin: '16px 0'}}>
            <Breadcrumb.Item><Link to="">Outgoing</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="">Incoming</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="">Employee</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="">Inventory</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="">Vendors</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="">Reports</Link></Breadcrumb.Item>
          </Breadcrumb>
          :
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>

        }

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
