import React from 'react';
import { Row, Col} from 'antd';

class TransactionDashboard extends React.Component{
render(){
    return(
      <div className = "items-dashboard">
        <Row type="flex" justify="start" style={{background:"#F5F5F5"}}>
          <Col span={2} style={{width:"15%", fontFamily: "Permanent Marker"}}>Barcode:</Col>
          <Col span={2} style={{width:"13%", fontFamily: "Permanent Marker"}}>Name:</Col>
          <Col span={2} style={{width:"13%", fontFamily: "Permanent Marker"}}>Price:</Col>
          <Col span={2} style={{width:"13%", fontFamily: "Permanent Marker"}}>Qty:</Col>
          <Col span={2} style={{width:"14%", fontFamily: "Permanent Marker"}}>Sum:</Col>
          <Col span={2} style={{width:"16%", fontFamily: "Permanent Marker"}}>Remove:</Col>
          <Col span={2} style={{width:"15%", fontFamily: "Permanent Marker"}}>Img:</Col>
        </Row>
      </div>


    );
}
}

export default TransactionDashboard;
