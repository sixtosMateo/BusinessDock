/// need a case where the trash deletes item right now both Icontext edits


import React from 'react';
import { List,
  Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';

const IconText = ({ type, text, barcode }) => (
  <span>

  <Link to={`/item/edit/${barcode}/`}>
    <Icon type={type} style={{ marginRight: 8, marginLeft: 10, marginTop:15, color:"#61B329" }}/>
  </Link>
    {text}

  </span>
);


const ItemAvatar =(props)=>{
  const IconTextDelete = ({ type, text, id, name }) => (
    <span onClick={()=>props.openModel(id, name)}>
      <Icon type={type} style={{ marginRight: 8, marginLeft: 10, marginTop:15, color:"#e50000" }}/>
      {text}
    </span>
  );

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
            actions={[<IconText type="edit" text="Edit" barcode={item.barcode}/>,
                      <IconTextDelete type="delete" text="Delete" id={item.itemId} name={item.name}/>  ]}
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
