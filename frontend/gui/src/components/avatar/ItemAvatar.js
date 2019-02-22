import React from 'react';
import { List,
  Icon, Row, Col } from 'antd';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const ItemAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.barcode}
            actions={[]}
            // image
            // extra={}
          >
          <List.Item.Meta
            />

            <Row type="flex" justify="start">
              <Col span={2} style={{width:"15%"}}>{item.barcode}</Col>
              <Col span={2} style={{width:"15%"}}>{item.name}</Col>
              <Col span={2} style={{width:"15%"}}>{item.inStockQty}</Col>
              <Col span={2} style={{width:"15%"}}>{item.salePrice}</Col>
              <Col span={2} style={{width:"15%"}}>{item.color}</Col>
              <Col span={2} style={{width:"15%"}}>{item.ageRequirement}</Col>
            </Row>
          </List.Item>
        )}
      />


  );
}

export default ItemAvatar;
