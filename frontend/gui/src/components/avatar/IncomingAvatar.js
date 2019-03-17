// activate a modal when they hover the item

import React from 'react';
import { List } from 'antd';
import { Icon, Row, Col} from 'antd';
import TransactionDashboard from "../cart/TransactionDashboard";

const IncomingItemAvatar =(props)=>{
  const {increment, decrement, removeItem} = props;
  return(
    <div className="incoming-item-avatar">

      <List
        itemLayout="vertical"
        size="small"
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
            extra={<img width={175} style={{margin:"0", padding:"0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
            <List.Item.Meta/>

            <Row>
              <Col sm={8} md={8} lg={8}>
                <h3>Barcode:</h3>
                <span style={{padding:"20px", fontSize: '18px'}}>{item.barcode}</span>
              </Col>

              <Col sm={8} md={8} lg={8}>
                <h3>Name:</h3>
                <span style={{padding:"20px", fontSize: '18px'}}>{item.name}</span>
              </Col>
              <Col span={2} style={{fontSize:"18px", width:"17%"}} onClick={()=> removeItem(item.barcode)} >
                <h3>Delete: </h3>
                <Icon type="delete" style={{color:"#e50000"}}/>
              </Col>
            </Row>

            <Row style={{padding:"5px", background:"#F5F5F5"}}>
            <Col sm={8} md={8} lg={8}>
              <strong>Price: </strong> {item.purchasedPrice}
            </Col>
            <Col sm={8} md={8} lg={8}>
              <strong>Qty: </strong>
              <Icon type="minus" onClick={()=> decrement(item.barcode)}
                style={{ fontSize: '16px', color: '#ff0000' }}/>

                {item.quantity}

              <Icon type="plus" onClick={()=> increment(item.barcode)}
                style={{ fontSize: '16px', color: '#0000ff'}}/>
            </Col>

            <Col sm={8} md={8} lg={8}>
            <strong>Sale Total: </strong>
            {item.itemSaleTotal}</Col>

            </Row>


          </List.Item>
        )}
      />

    </div>
  );
}

export default IncomingItemAvatar;
