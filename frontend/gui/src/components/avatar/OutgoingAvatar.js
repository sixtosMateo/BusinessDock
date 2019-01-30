// activate modal when they hover over the barcode

import React from 'react';
import { List, Icon, Row, Col} from 'antd';
import TransactionDashboard from "../cart/TransactionDashboard";

const OutgoingItemAvatar =(props)=>{

  const {increment, decrement} = props;
  return(

    <div style={{marginTop:"15px"}}>
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
              <Col span={4}>{item.salePrice}</Col>
              <Col span={4}>
                <Icon type="minus" onClick={()=> decrement(item.barcode)}
                  style={{ fontSize: '16px', color: '#ff0000' }}/>
                <span>  {  item.quantity  }  </span>
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

export default OutgoingItemAvatar;
