import React from 'react';
import { List,
  Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';  

const IconText = ({ type, text, barcode }) => (
  <span>

  <Link to={`/inventory/item/edit/${barcode}`}>
    <Icon type={type} style={{ marginRight: 8, marginLeft: 10, marginTop:15 }}/>
  </Link>
    {text}

  </span>
);

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
            actions={[<IconText type="edit" text="Edit Item" barcode={item.barcode}/>,
                      <IconText type="delete" text="Delete Item"/>  ]}
            // image
            extra={<img width={175} style={{margin:"0", padding:"0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
          <List.Item.Meta
            />
            <Row type="flex" justify="start" style={{textAlign:"center"}}>
              <Col span={2} style={{width:"17%"}}><strong>{item.barcode}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.name}</strong></Col>
              <Col span={2} style={{width:"16%"}}><strong>{item.inStockQty}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.salePrice}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.color}</strong></Col>
              <Col span={2} style={{width:"17%"}}><strong>{item.ageRequirement}</strong></Col>
            </Row>



          </List.Item>
        )}
      />



  );
}

export default ItemAvatar;
