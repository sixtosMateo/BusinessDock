import React from 'react';
import Dashboard from './Dashboard';
import { Layout, Icon } from 'antd';
import { withRouter,Link } from 'react-router-dom';
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

        <Content style={{ padding: '0 50px', marginBottom:'60px'}}>
          <Submenu {...this.props}/>

          <div className="layoutContentChildren" style={{ background: '#fff', padding: 10, minHeight: 280 }}>

          { this.props.children }

          </div>

        </Content>


        <Footer style={{ textAlign: 'center', background:'#001529'}}>


            <div style={{ height:"100px", color:"#FFFFFF", width:"100%", marginTop: "15px", textAlign: 'center'} }>

              <div className="visitor-navigation" style={{width:"250px", float: "left"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Navigate: </h3></div>
                <div><Link to="/">Overview</Link></div>
                <div><Link to="/demo">Demo</Link></div>
                <div><Link to="/client">Clients</Link></div>
                <div><Link to="/contact">Developer</Link></div>
              </div>

              <div className="social-media" style={{width:"250px ", float: "left"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Social Media: </h3></div>
                <div onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}><Icon type="linkedin"/>  in/sixtosmateo/</div>
                <div onClick={()=>window.open('https://github.com/sixtosMateo/')}><Icon type="github" />  github.com/sixtosMateo/</div>
                <div onClick={()=>window.open('https://twitter.com/SixtosMateo')}><Icon type="twitter" />  twitter.com/SixtosMateo</div>
              </div>

              <div className="contact-info" style={{width:"250px", float: "left"} }>
                <div><h3 style={{color:"#C0C0C0"}}>Contact Info: </h3></div>
                <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
                <div><Icon type="mail" />  mateosixtos@gmail.com</div>
                <div><Icon type="phone"/>  (831)585-0879</div>
              </div>
              <div className="contact-info" style={{width:"250px", float: "left"} }>
                <div><h3 style={{color:"#C0C0C0"}}>To be continue: </h3></div>
                <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
                <div><Icon type="phone"/>  (831)585-0879</div>
                <div><Icon type="phone"/>  (831)585-0879</div>
              </div>

            </div>
        </Footer>

        <div style={{ float:"bottom", color:"#FFFFFF",textAlign:"center", width:"100%", background:'#001529'} }>BusinessDock ©2018 Created by Mateo Sixtos</div>
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
