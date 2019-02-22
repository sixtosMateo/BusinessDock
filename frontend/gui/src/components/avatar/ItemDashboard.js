import React from 'react';
import { Row, Col} from 'antd';

class ItemDashboard extends React.Component{
render(){
    return(
      <div className = "items-dashboard" style={{margin:"10px", background:"#F5F5F5"}}>
        <Row type="flex" justify="start">
          <Col span={2} style={{width:"15%", fontFamily: "Permanent Marker"}}>Barcode:</Col>
          <Col span={2} style={{width:"15%", fontFamily: "Permanent Marker"}}>Name:</Col>
          <Col span={2} style={{width:"15%", fontFamily: "Permanent Marker"}}>Qty:</Col>
          <Col span={2} style={{width:"14%", fontFamily: "Permanent Marker"}}>Price:</Col>
          <Col span={2} style={{width:"14%", fontFamily: "Permanent Marker"}}>Color:</Col>
          <Col span={2} style={{width:"14%", fontFamily: "Permanent Marker"}}>Age+:</Col>
          <Col span={1} style={{width:"13%", fontFamily: "Permanent Marker"}}>Image:</Col>
        </Row>
      </div>


    );
}
}

export default ItemDashboard;
