import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';


class Welcome extends React.Component{
render(){
    return(
      <div className="welcomeComponent">
        <h1 >Welcome to BusinessDock Homepage!</h1>
        <Row style={{marginBottom:"20px"}}>
          <Col xs={12} sm={6} md={6} lg={6} style={{marginBottom:"5px", height: "100px"}}>
            <h3 style={{font:"oswald", height: "50px"}}>Scan barcode:</h3>
            <Icon type="barcode" style={{fontSize: '40px'}}/>
          </Col>

          <Col xs={12} sm={6} md={6} lg={6} style={{marginBottom:"5px", height: "100px"}}>
            <h3 style={{font:"oswald", height: "50px"}}>Devices Accessible:</h3>
            <Icon type="tablet" style={{fontSize: '40px'}}/>
          </Col>

          <Col xs={12} sm={6} md={6} lg={6} style={{marginBottom:"5px", height: "100px"}}>
            <h3 style={{font:"oswald", height: "50px"}}>Real-Time Dashboards:</h3>
            <Icon type="line-chart" style={{fontSize: '40px'}}/>
          </Col>

          <Col xs={12} sm={6} md={6} lg={6} style={{marginBottom:"5px", height: "100px"}}>
            <h3 style={{font:"oswald", height: "50px"}}>PDF Reports:</h3>
            <Icon type="file-pdf" style={{fontSize: '40px'}}/>
          </Col>
        </Row>
        <div>
          <h2>BusinessDock</h2>
          <div style={{width:"600px auto"}}>
          <p>BusinessDock helps local vendors innovate the
          process of managing business operations in a daily basis. The
          user-interface is straightforward and helps clents interact with
          web-application at ease.</p>
          <p>This platform allows clients to archieve investment and sale
          transactions and simultaneously keep track of inventory count.
          In addition, BusinessDock provides dashboards of Key Performance
          Indicators(KPIs) in real-time to certain stakeholders. Another great
          feature is that this platform renders PDF reports of business metrics.
          </p>
          <p>
            The purpose of BusinessDock is to help business that are starting
            grow and mature. We grow when you do!
          </p>
          <p>
            If you are curious and want to know more about BusinessDock please
            try our <span ><Link to="/demo">Demo</Link></span>
          </p>

          </div>
        </div>




      </div>


    );
}
}

export default Welcome;
