import React from 'react';
import Dashboard from './Dashboard';
import { Layout, Icon } from 'antd';
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Row, Col } from 'antd';
import Submenu from './Submenu';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component{

  render(){
    return(
      <Layout className="layout">
        <Header>
          <Dashboard/>
        </Header>

        <Content style={{ padding: '0 50px', marginBottom:'90px'}}>
          <Submenu {...this.props}/>

          <div className="layoutContentChildren" style={{ background: '#fff', padding: 10, minHeight: 280 }}>

          { this.props.children }

          </div>

        </Content>


        <Footer style={{background:'#001529', padding: "10px", margin:"0"}}>

          <Row style={{width:"100%",  padding: "0", marginTop:"25px", textAlign:"center"}}>

            <Col xs={12} sm={10} md={6} lg={6}  style={{ height: "150px"}}>
              <div className="visitor-navigation" style={{color:"#C0C0C0"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Navigate: </h3></div>
                <div><Link to="/">Overview</Link></div>
                <div><Link to="/demo">Demo</Link></div>
                <div><Link to="/client">Clients</Link></div>
                <div><Link to="/contact">Developer</Link></div>
              </div>
            </Col>

            <Col xs={12} sm={10} md={6} lg={6}  style={{height: "150px"}}>
              <div className="social-media" style={{color:"#C0C0C0"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Social Media: </h3></div>
                <div onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}><Icon type="linkedin"/>  in/sixtosmateo</div>
                <div onClick={()=>window.open('https://github.com/sixtosMateo/')}><Icon type="github" />  github.com/sixtosMateo</div>
                <div onClick={()=>window.open('https://twitter.com/SixtosMateo')}><Icon type="twitter" />  twitter.com/SixtosMateo</div>
              </div>
            </Col>
            <Col xs={12} sm={10} md={6} lg={6}  style={{height: "150px"}}>
              <div className="contact-info" style={{color:"#C0C0C0"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Contact Info: </h3></div>
                <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
                <div><Icon type="mail" />  mateosixtos@gmail.com</div>
                <div><Icon type="phone"/>  (831)585-0879</div>
              </div>
            </Col>
            <Col xs={12} sm={10} md={6} lg={6}  style={{height: "150px"}}>
              <div className="contact-info" style={{color:"#C0C0C0"}}>
                <div><h3 style={{color:"#C0C0C0"}}>Education: </h3></div>
                <div className = "csumbImage">
                  <img src="/csumb.png" style={{width:'5rem', height:"5rem"}} alt="csumb Image"/>
                </div>
              </div>
            </Col>
          </Row>

        </Footer>

        <div style={{ float:"bottom", textAlign:"center", width:"100%", background:'#001529'}}>
        <h4 style={{color:"#FFFFFF"}}>BusinessDock ©2018 Created by Mateo Sixtos</h4>
        </div>
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
