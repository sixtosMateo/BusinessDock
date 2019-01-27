import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';



class Contact extends React.Component{
render(){
    return(
      <div className = "contactComponent">
        <div className = "title">
          <h1>Mateo Sixtos</h1>
        </div>

        <div className = "position">
          <h2>Full-Stack Developer</h2>
        </div>

        <div className = "profileImage">
          <img src="/profileImage.png" style={{width:'10rem', height:"10rem"}} alt="profile Image"/>
        </div>

        <div className = "csumbImage">
          <img src="/csumb.png" style={{width:'5rem', height:"5rem"}} alt="csumb Image"/>
        </div>


        <div className = "contact-container">
          <div><Icon type="linkedin" onClick={()=>window.open('https://www.linkedin.com/in/sixtosmateo/')}/>  in/sixtosmateo/</div>
          <div><Icon type="github" onClick={()=>window.open('https://github.com/sixtosMateo/')}/>  github.com/sixtosMateo/</div>
          <div><Icon type="twitter" onClick={()=>window.open('https://twitter.com/SixtosMateo')}/>  twitter.com/SixtosMateo</div>
          <div><Icon type="mail" />  sixtosmateo@gmail.com</div>
          <div><Icon type="phone"/>  (831)585-0879</div>
        </div>

        <div className = "Description">
          <p>Hi, my name is Mateo Sixtos. I am a Full-Stack Developer who enjoys
          developing responsive web-applications that innovates the process of
          managing business operations for local vendors. Feel free to contact
          me!</p>
        </div>
      </div>
    );
}
}

export default Contact;
