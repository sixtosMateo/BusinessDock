// activate modal when they hover over the barcode
// bug: when signed in and immediately redirect to outgoing it doesnt read data
//      only when you navigate to items
// prediction: the componentDidMount will set state has to be in the upper parent node

import React from 'react';
import { List, Icon, Row, Col} from 'antd';
import TransactionDashboard from "../cart/TransactionDashboard";

const OutgoingItemAvatar =(props)=>{

  const {increment, decrement} = props;
  return(

    <div className="outgoing-item-avatar">
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
            extra={<img width={175} style={{margin:"0", padding:"0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
            <List.Item.Meta/>


            <Row type="flex" justify="start" style={{marginLeft:"15px"}}>
              <Col span={2} style={{width:"17%"}}>{item.barcode} </Col>
              <Col span={2} style={{width:"16%"}}>{item.name}</Col>
              <Col span={2} style={{width:"16%"}}>{item.salePrice}</Col>
              <Col span={2} style={{width:"17%"}}>
                <Icon type="minus" onClick={()=> decrement(item.barcode)}
                  style={{ fontSize: '16px', color: '#ff0000' }}/>
                <span>  {  item.quantity  }  </span>
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

export default OutgoingItemAvatar;
