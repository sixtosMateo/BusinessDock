import React from 'react';
import { Icon, Row, Col} from 'antd';

class TransactionDashboard extends React.Component{
render(){
    return(
      <div className = "dashboard">
      <Row type="flex" justify="start">
        <Col span={4} style={{fontFamily: "Permanent Marker"}}>Barcode: </Col>
        <Col span={4} style={{fontFamily: "Permanent Marker"}}>Name: </Col>
        <Col span={4} style={{fontFamily: "Permanent Marker"}}>Sale Price: </Col>
        <Col span={4} style={{fontFamily: "Permanent Marker"}}>Quantity: </Col>
        <Col span={4} style={{fontFamily: "Permanent Marker"}}>Item Sum: </Col>
      </Row>
      </div>


    );
}
}

export default TransactionDashboard;
