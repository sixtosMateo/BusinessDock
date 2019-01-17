import React from 'react';
import Dashboard from './Dashboard';
import { Layout, Menu, Breadcrumb, Switch } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Submenu from './Submenu';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component{



  render(){
    return(
      <Layout className="layout">
        <Header>
          <Dashboard {...this.props}/>
        </Header>
        <Content style={{ padding: '0 50px' }}>

          <div className="layoutContentChildren" style={{ background: '#fff', padding: 10, minHeight: 280 }}>

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
