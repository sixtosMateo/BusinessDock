import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';


class Welcome extends React.Component{
render(){
    return(
      <div className="welcomeComponent">
        <Row style={{marginBottom:"20px"}}>
          <Col span={6}>
            <h3>Scan barcode:</h3>
            <Icon type="barcode" style={{fontSize: '40px'}}/>
          </Col>
          <Col span={6}>
            <h3>Devices Accessible:</h3>
            <Icon type="tablet" style={{fontSize: '40px'}}/>
          </Col>
          <Col span={6}>
            <h3>Real-Time Dashboards:</h3>
            <Icon type="line-chart" style={{fontSize: '40px'}}/>
          </Col>
          <Col span={6}>
            <h3>PDF Reports:</h3>
            <Icon type="file-pdf" style={{fontSize: '40px'}}/>
          </Col>
        </Row>
        <div>
          <h1>BusinessDock</h1>
          <div style={{width:"600px"}}>
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
