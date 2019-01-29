import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';


class Welcome extends React.Component{
render(){
    return(
      <div className="welcomeComponent">
        <div className="icon-container">
          <h2>Scan barcode:</h2>
          <Icon type="barcode" style={{fontSize: '50px'}}/>
        </div>

        <div className="icon-container">
          <h2>Accessibility:</h2>
          <Icon type="tablet" style={{fontSize: '50px'}}/>
        </div>

        <div className="icon-container">
          <h2>Real-Time Dashboards:</h2>
          <Icon type="line-chart" style={{fontSize: '50px'}}/>
        </div>

        <div className="icon-container">
          <h2>PDF Reports:</h2>
          <Icon type="file-pdf" style={{fontSize: '50px'}}/>
        </div>

      </div>


    );
}
}

export default Welcome;
