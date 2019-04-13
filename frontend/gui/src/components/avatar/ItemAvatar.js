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
        style={{overflow:"auto", height: "800px"}}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            // console.log(page);
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
            <Row style={{}}>
              <Col sm={8} md={8} lg={8}>
              <div><strong>Barcode: </strong></div>
              <h3><span style={{padding:"20px"}}>{item.barcode}</span></h3>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <div><strong>Name: </strong></div>
              <h3><span style={{padding:"20px"}}>{item.name}</span></h3>
              </Col>
              <Col sm={8} md={8} lg={8}>
              <div><strong>InStockQty: </strong></div>
              <h3>{item.inStockQty}</h3>
              </Col>
            </Row>


            <Row style={{background:"#F5F5F5"}}>
              <Col sm={8} md={8} lg={8}>
                <strong>Price: </strong>{item.salePrice}
              </Col>
              <Col sm={8} md={8} lg={8}>
                <strong>Color: </strong>{item.color}
              </Col>
              <Col sm={8} md={8} lg={8}>
              <strong>Age: </strong>{item.ageRequirement}
              </Col>
            </Row>

          </List.Item>
        )}
      />



  );
}

export default ItemAvatar;
