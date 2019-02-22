import React from 'react';
import { Row, Col} from 'antd';

class TransactionDashboard extends React.Component{
render(){
    return(
      <div className = "items-dashboard">
        <Row type="flex" justify="start" style={{background:"#F5F5F5"}}> 
          <Col span={4} style={{width:"20%", fontFamily: "Permanent Marker"}}>Barcode:</Col>
          <Col span={4} style={{width:"20%", fontFamily: "Permanent Marker"}}>Name:</Col>
          <Col span={4} style={{width:"20%", fontFamily: "Permanent Marker"}}>Price:</Col>
          <Col span={4} style={{width:"20%", fontFamily: "Permanent Marker"}}>Qty:</Col>
          <Col span={4} style={{width:"20%", fontFamily: "Permanent Marker"}}>Sum:</Col>
        </Row>
      </div>


    );
}
}

export default TransactionDashboard;
