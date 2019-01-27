import React from 'react';
import Dashboard from './Dashboard';
import { Layout, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Submenu from './Submenu';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component{

  render(){
    return(
      <Layout className="layout">
        <Header>
          <Dashboard/>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Submenu {...this.props}/>

          <div className="layoutContentChildren" style={{ background: '#fff', padding: 10, minHeight: 280 }}>

          { this.props.children }

          </div>

        </Content>


        <Footer style={{ textAlign: 'center' }}>
          <div>BusinessDock ©2018 Created by Mateo Sixtos</div>
          <div>
            <div onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}><Icon type="linkedin"/>  in/sixtosmateo/</div>
            <div onClick={()=>window.open('https://github.com/sixtosMateo/')}><Icon type="github" />  github.com/sixtosMateo/</div>
            <div onClick={()=>window.open('https://twitter.com/SixtosMateo')}><Icon type="twitter" />  twitter.com/SixtosMateo</div>
            <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
            <div><Icon type="phone"/>  (831)585-0879</div>
          </div>

        </Footer>
      </Layout>
    );
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null,  mapDispatchToProps)(CustomLayout));
