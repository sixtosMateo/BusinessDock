import React from 'react';
import { List, Icon, Row, Col } from 'antd';


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const VendorAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.vendorId}
            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            extra={<img width={175} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta/>

            <Row>
              <Col span={12} style={{textAlign:"left"}}>{item.name}</Col>
              <Col span={12} style={{textAlign:"right"}}>{item.phoneNumber}</Col>
            </Row>

            <Row style={{marginLeft:"30px", background:"#F5F5F5"}}>
              <Col span={12}>Address:</Col>
              <Col span={12}>{item.address}</Col>
            </Row>

            <Row>
              <Col span={12} style={{textAlign:"center"}}>Hours Open:</Col>
              <Col span={12} style={{textAlign:"center"}}>{item.hoursOpen}</Col>
            </Row>
          </List.Item>
        )}
      />


  );
}

export default VendorAvatar;
