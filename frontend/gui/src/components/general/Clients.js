import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';



class Client extends React.Component{
render(){
    return(
      <div className = "contactComponent">
        <div className = "karisTitle">
          <h1>Karis Toys</h1>
        </div>


        <Row style={{marginBottom:"10px"}}>

          <Col span={12}>
              <img src="/Karis.png" style={{width:'10rem', height:"10rem", marginBottom:"10px"}} alt="Karis Image"/>

              <div onClick={()=>window.open('http://karistoys.herokuapp.com')}
                style={{color:"#1e90ff", marginBottom:"5px", width:'11.5rem'}}><Icon type="desktop"/>
                karistoys.herokuapp.com
              </div>

              <div className = "contact" >
                <div><Icon type="shop" /> 548 East Alisal Street </div>
                <div>Salinas, California 93905</div>
                <div>Monday - Sunday: </div>
                <div>10:00pm-6:00pm PST</div>
              </div>
          </Col>

        </Row>
        <p> A family from Salinas are dedicated in providing entertainment at
        a fair price. This vendor was open for about 2 years ago and have
        served residents from Salinas since then. If you are looking for
        entertaining toys or accessories for work please stop by and take a
        look around.</p>





      </div>
    );
}
}

export default Client;
