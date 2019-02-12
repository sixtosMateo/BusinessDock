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
            key={item.barcode}>
            <List.Item.Meta/>
            <Row type="flex" justify="start">
            <Col span={4}>{item.barcode} </Col>
            <Col span={4}>{item.name}</Col>
            <Col span={4}>{item.purchasedPrice}</Col>
            <Col span={4}>
              <Icon type="minus" onClick={()=> decrement(item.barcode)}
                style={{ fontSize: '16px', color: '#ff0000' }}/>

                {item.quantity}

              <Icon type="plus" onClick={()=> increment(item.barcode)}
                style={{ fontSize: '16px', color: '#0000ff'}}/>
            </Col>

            <Col span={4}>{item.itemSaleTotal}</Col>
            </Row>


          </List.Item>
        )}
      />

    </div>
  );
}

export default IncomingItemAvatar;
