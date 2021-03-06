import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Col, Row } from 'antd';



class Contact extends React.Component{
render(){
    return(
      <div className = "contactComponent">

        <Row style={{background:"#F5F5F5", marginBottom:"10px", textAlign:"center"}}>

            <Col xs={14} sm={12} md={10} lg={6}>
              <h1 style={{fontFamily: "Permanent Marker"}}>Mateo Sixtos: </h1>
              <img src="/profileImage.png" style={{width:'13rem', height:"13rem"}} alt="profile"/>
            </Col>

            <Col xs={16} sm={12} md={6} lg={8}>

              <h2 style={{color:"#5f9ea0", fontFamily: "Permanent Marker"}}>Software Engineer</h2>
              <h3>CSU Monterey Bay </h3>
              <img src="/csumb.png" style={{width:'5rem', height:"5rem"}} alt="csumb"/>
              <h4>CSIT-in-3 Program</h4>
            </Col>

            <Col xs={16} sm={10} md={8} lg={8}>

              <h2 style={{color:"#5f9ea0",fontFamily: "Permanent Marker"}}>Contact info:</h2>
              <div style={{color:"#1e90ff", fontSize:"1.1rem"}}><Icon type="linkedin" onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}/>  in/sixtosmateo/</div>
              <div style={{color:"#1e90ff", fontSize:"1.005rem"}}><Icon type="github" onClick={()=>window.open('https://github.com/sixtosMateo/')}/>  github.com/sixtosMateo/</div>
              <div style={{color:"#1e90ff", fontSize:"1.005rem"}}><Icon type="twitter" onClick={()=>window.open('https://twitter.com/SixtosMateo')}/>  twitter.com/SixtosMateo</div>
              <div style={{fontSize:"1.1rem"}}><Icon type="mail" />  sixtosmateo@gmail.com</div>
              <div style={{fontSize:"1.1rem"}}><Icon type="phone"/>  (831)585-0879</div>
            </Col>
        </Row>

        <div></div>
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
