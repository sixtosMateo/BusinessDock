/// need a case where the trash deletes item right now both Icontext edits
import React from 'react';
import { List,
  Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';



const DamageItemAvatar =(props)=>{


  return(
      <List
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

            // image
            
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
              <h3><span style={{padding:"20px"}}>{item.itemId}</span></h3>
              </Col>
              <Col sm={8} md={8} lg={8}>
              <div><strong>Qty: </strong></div>
              <h3>{item.quantity}</h3>
              </Col>
            </Row>


            <Row style={{background:"#F5F5F5"}}>
              <Col sm={8} md={8} lg={8}>
                <strong>Price: </strong>{item.employeeId}
              </Col>
              <Col sm={8} md={8} lg={8}>
                <strong>Color: </strong>{item.storeId}
              </Col>
              <Col sm={8} md={8} lg={8}>
              <strong>Age: </strong>{item.description}
              </Col>
            </Row>

          </List.Item>
        )}
      />



  );
}

export default DamageItemAvatar;
