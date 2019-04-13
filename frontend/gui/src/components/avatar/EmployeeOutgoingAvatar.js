//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';

const EmployeeOutgoingAvatar =(props)=>{
  const IconText = ({ type, text, transactionId }) => (
    <span onClick={()=>props.getOutgoingItems(transactionId)}>
      <Icon type={type}
            style={{ marginRight: 8, marginTop:15, fontSize:"20px",
                        color:"#61B329" }}/>
      {text}

    </span>
  );

  return(
      <List

        itemLayout="vertical"
        size="medium"
        pagination={{
          onChange: (page) => {
            // console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.transactionId}
            actions={[<IconText type="ordered-list"
                            text="View Items"
                            transactionId={item.transactionId}/>]}
            extra={[]}
          >
            <List.Item.Meta/>

            <Row type="flex" justify="start" style={{textAlign:"left"}}>
                <Col sm={12} md={12} lg={12} style={{textAlign:"left"}}><h2>Transaction ID: <strong>{item.transactionId} </strong></h2></Col>
                <Col sm={12} md={12} lg={12} style={{textAlign:"right"}}><h4>Date/Time: <strong>{item.createdAt} </strong></h4></Col>
            </Row>
            <Row style={{padding:"5px", background:"#F5F5F5"}}>
                <h4>VendorID:
                  <strong>
                  {item.storeId? item.storeId : item.vendorId}
                  </strong>
                </h4>
            </Row>
            <Row style={{paddingLeft:"10px"}}>
              <Col sm={8} md={8} lg={8}> <h4>Subtotal: <strong>{item.subtotal}</strong></h4></Col>
              <Col sm={8} md={8} lg={8}> <h4>Tax: <strong>{item.tax}</strong></h4></Col>
              <Col sm={8} md={8} lg={8}> <h4>Total: <strong>{item.total}</strong></h4></Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeOutgoingAvatar;
