//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';


const EmployeeOutgoingItemAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="medium"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.transactionId}
            actions={[]}
            extra={[]}
          >
            <List.Item.Meta/>
            <Row type="flex" justify="start" style={{textAlign:"right" }}>

              <Col lg={12} style={{textAlign:"center" }}>
                <Col >Barcode: <strong>{item.barcode}</strong></Col>
                <Col >Item: <strong>{item.name}</strong></Col>
              </Col>

              <Col lg={12}>
                <h4>Qty: <strong>{item.quantity}</strong></h4>
                <h4>Price: <strong>{item.price}</strong></h4>
                <h4>Tax: <strong>{item.tax}</strong></h4>
                <h4>Sale: <strong>{item.itemSaleTotal}</strong></h4>
              </Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeOutgoingItemAvatar;