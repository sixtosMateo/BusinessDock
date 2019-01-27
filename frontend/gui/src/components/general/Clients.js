import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';



class Client extends React.Component{
render(){
    return(
      <div className = "contactComponent">
        <div className = "karisTitle">
          <h1>Karis Toys</h1>
        </div>

        <div className = "karisImage">
          <img src="/Karis.png" style={{width:'10rem', height:"10rem"}} alt="Karis Image"/>
        </div>
        <div className = "contact">
          <div><Icon type="shop" /> 548 East Alisal Street </div>
          <div>Salinas, California 93905</div>
          <div>Monday - Sunday: </div>
          <div>10:00pm-6:00pm PST</div>
        </div>
        <div className = "website" >
          <div onClick={()=>window.open('http://karistoys.herokuapp.com')}><Icon type="desktop" />  http://karistoys.herokuapp.com/</div>
        </div>

        <div className="description">
          <p> A family from Salinas are dedicated in providing entertainment at
          a fair price. This vendor was open for about 2 years ago and have
          served residents from Salinas since then. If you are looking for
          entertaining toys or accessories for work please stop by and take a
          look around.</p>
        </div>

      </div>
    );
}
}

export default Client;
