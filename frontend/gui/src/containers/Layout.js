import React from 'react';
import { Link } from 'react-router-dom';


import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component{

  render(){
    return(
      <Layout className="layout">
        <Header>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >

            <Menu.Item key="1"><Link to="/">BusinessDock</Link></Menu.Item>
            <Menu.Item key="2">Outgoing</Menu.Item>
            <Menu.Item key="3">Incoming</Menu.Item>
            <Menu.Item key="4">Employees</Menu.Item>
            <Menu.Item key="5">Inventory</Menu.Item>
            <Menu.Item key="6">Vendors</Menu.Item>
            <Menu.Item key="7">Reports</Menu.Item>
            <Menu.Item key="8"><Link to="/">Login</Link></Menu.Item>

          </Menu>
        </Header>


        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          BusinessDock ©2018 Created by Mateo Sixtos
        </Footer>
      </Layout>

    );

  }
}

export default CustomLayout;
