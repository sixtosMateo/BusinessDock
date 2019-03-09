import React from 'react';
import { Row, Col} from 'antd';

class TransactionHeaders extends React.Component{
render(){
    return(
      <div className = "transaction-headers">
        <Row type="flex" justify="start" style={{background:"#F5F5F5"}}>
          <Col span={2} style={{width:"17%", fontFamily: "Permanent Marker"}}>TransactionID:</Col>
          <Col span={2} style={{width:"16%", fontFamily: "Permanent Marker"}}>Store ID:</Col>
          <Col span={2} style={{width:"16%", fontFamily: "Permanent Marker"}}>Subtotal:</Col>
          <Col span={2} style={{width:"17%", fontFamily: "Permanent Marker"}}>Tax:</Col>
          <Col span={2} style={{width:"17%", fontFamily: "Permanent Marker"}}>Total:</Col>
          <Col span={2} style={{width:"17%", fontFamily: "Permanent Marker"}}>Date:</Col>
        </Row>
      </div>


    );
}
}

export default TransactionHeaders;
