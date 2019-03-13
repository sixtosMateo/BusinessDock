//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';


const EmployeeOutgoingAvatar =(props)=>{
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
            actions={[<Icon type="ordered-list"
                            text="view items"
                            style={{ marginRight: 8, marginTop:15, color:"#61B329"}}
                            onClick={()=>props.getOutgoingItems(item.transactionId)}/>]}
            extra={[]}
          >
            <List.Item.Meta/>
            <Row type="flex" justify="start" style={{textAlign:"center"}}>
              <Col span={2} style={{width:"17%"}} ><strong>{item.transactionId}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.storeId}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.subtotal}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.tax}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.subtotal}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.createdAt}</strong></Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeOutgoingAvatar;
