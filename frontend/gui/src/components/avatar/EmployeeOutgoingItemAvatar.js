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
              <Col span={2} style={{width:"17%"}} ><strong>{item.barcode}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.name}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.quantity}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.price}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.tax}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.itemSaleTotal}</strong></Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeOutgoingItemAvatar;
