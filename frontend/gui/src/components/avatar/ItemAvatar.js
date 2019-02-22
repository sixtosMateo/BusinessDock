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
            extra={<img width={175} style={{margin:"0", padding:"0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
          <List.Item.Meta
            />

            <Row type="flex" justify="start" style={{textAlign:"center"}}>
              <Col span={2} style={{width:"17%"}}>{item.barcode}</Col>
              <Col span={2} style={{width:"16%"}}>{item.name}</Col>
              <Col span={2} style={{width:"16%"}}>{item.inStockQty}</Col>
              <Col span={2} style={{width:"17%"}}>{item.salePrice}</Col>
              <Col span={2} style={{width:"17%"}}>{item.color}</Col>
              <Col span={2} style={{width:"17%"}}>{item.ageRequirement}</Col>
            </Row>
          </List.Item>
        )}
      />


  );
}

export default ItemAvatar;
