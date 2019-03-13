//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';


const EmployeeOutgoingAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="medium"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.transactionId}
            actions={[<Icon type="ordered-list"
                            text="view items"
                            style={{ marginRight: 8, marginTop:15, color:"#61B329"}}
                            onClick={()=>props.getOutgoingItems(item.transactionId)}/>]}
            extra={[]}
          >
            <List.Item.Meta/>
            <Row type="flex" justify="start" style={{textAlign:"left"}}>

                <Col lg={12}><h2>Transaction ID: <strong>{item.transactionId} </strong></h2></Col>
                <Col lg={12}>Date/Time: <strong>{item.createdAt} </strong></Col>
            </Row>
            <Row style={{padding:"5px", background:"#F5F5F5"}}>
                <h4>VendorID:
                  <strong>
                  {item.storeId? item.storeId : item.vendorId}
                  </strong>
                </h4>

            </Row>
            <Row style={{paddingLeft:"10px"}}>
              <Col lg={8}> <h4>Subtotal: <strong>{item.subtotal}</strong></h4></Col>
              <Col lg={8}> <h4>Tax: <strong>{item.tax}</strong></h4></Col>
              <Col lg={8}> <h4>Total: <strong>{item.total}</strong></h4></Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeOutgoingAvatar;
