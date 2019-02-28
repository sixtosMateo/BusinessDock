// activate a modal when they hover the item

import React from 'react';
import { List } from 'antd';
import { Icon, Row, Col} from 'antd';
import TransactionDashboard from "../cart/TransactionDashboard";

const IncomingItemAvatar =(props)=>{
  const {increment, decrement} = props;
  return(
    <div className="incoming-item-avatar">

      {props.data.length > 0 ?
        <TransactionDashboard/>
        :
        ""
      }

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
            <Row type="flex" justify="start" style={{marginLeft:"15px"}}>
            <Col span={2} style={{width:"17%"}}>{item.barcode} </Col>
            <Col span={2} style={{width:"16%"}}>{item.name}</Col>
            <Col span={2} style={{width:"16%"}}>{item.purchasedPrice}</Col>
            <Col span={2} style={{width:"17%"}}>
              <Icon type="minus" onClick={()=> decrement(item.barcode)}
                style={{ fontSize: '16px', color: '#ff0000' }}/>

                {item.quantity}

              <Icon type="plus" onClick={()=> increment(item.barcode)}
                style={{ fontSize: '16px', color: '#0000ff'}}/>
            </Col>

            <Col span={2} style={{width:"17%"}}>{item.itemSaleTotal}</Col>
            <Col span={2} style={{width:"17%"}}><Icon type="delete" /></Col>
            </Row>


          </List.Item>
        )}
      />

    </div>
  );
}

export default IncomingItemAvatar;
