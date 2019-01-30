import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Col, Row } from 'antd';
import {Link} from 'react-router-dom';



class Contact extends React.Component{
render(){
    return(
      <div className = "contactComponent">

        <Row gutter={24} >

            <Col span={8} >
              <h1>Mateo Sixtos: </h1>
              <img src="/profileImage.png" style={{width:'15rem', height:"15rem", border:"solid 1px"}} alt="profile Image"/>
            </Col>

            <Col span={8} >
              <h2 style={{color:"#5f9ea0", fontFamily: "Permanent Marker"}}>Software Engineer</h2>
              <h4>CSU Monterey Bay </h4>
              <img src="/csumb.png" style={{width:'5rem', height:"5rem", border:"solid 1px"}} alt="csumb Image"/>
            </Col>

            <Col span={8} >
              <h2 style={{fontFamily: "Permanent Marker"}}>Contact info:</h2>
              <div style={{color:"#1e90ff"}}><Icon type="linkedin" onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}/>  in/sixtosmateo/</div>
              <div style={{color:"#1e90ff"}}><Icon type="github" onClick={()=>window.open('https://github.com/sixtosMateo/')}/>  github.com/sixtosMateo/</div>
              <div style={{color:"#1e90ff"}}><Icon type="twitter" onClick={()=>window.open('https://twitter.com/SixtosMateo')}/>  twitter.com/SixtosMateo</div>
              <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
              <div><Icon type="phone"/>  (831)585-0879</div>
            </Col>
        </Row>
        <div className = "Description" style={{right:"0"}}>
          <p>Hi, my name is Mateo Sixtos. I am a Full-Stack Developer who enjoys
          developing responsive web-applications that innovates the process of
          managing business operations for local vendors. I was able to graduate
          from California State University Monterey Bay in less than four years.
          My degree is in Computer Science and Information Technology with an
          emphasis in Software Engineer.
          </p>

          <p>I been interested in Full-Stack development ever since I participated
          in several hackathons. After attending several networking events, I was
          able to land a Full-Stack internship with nLightn Technologies. I learned
          so much with this opportunity that I took the initiative to develop a
          TransactionApp for Karis Toys. My client needed an web-application that
          helped them keep track of their inventory and financial records.</p>

          <p>Now I am developing BusinessDock. This is an extend of TransactionApp
          but intergrating other frameworks and libraries to improve performance and user
          experience.</p>

          <p>If you have any questions feel free to contact me at sixtosmateo@gmail.com!</p>
        </div>

      </div>
    );
}
}

export default Contact;
