import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';

const IconText = ({ type, text, id }) => (

  <span>
    <Link to={`/vendors/edit/${id}`}>
      <Icon type={type} style={{ marginRight: 8 }}/>
    </Link>
    {text}
  </span>
);



const VendorAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.vendorId}

            actions={[<IconText type="edit" text="Edit Vendor" id={item.vendorId}/>,
                      <IconText type="delete" text="Delete Vendor"/>  ]}
            extra={<img width={175} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta/>

            <Row>
              <Col span={12} style={{textAlign:"left"}}><h2>{item.name}</h2></Col>
              <Col span={12} style={{textAlign:"right"}}><strong>{item.phoneNumber}</strong></Col>
            </Row>

            <Row style={{marginLeft:"30px", background:"#F5F5F5"}}>
              <Col span={12}><strong>Address:</strong></Col>
              <Col span={12}>{item.address}</Col>
            </Row>

            <Row>
              <Col span={12} style={{textAlign:"center"}}><strong>Hours Open:</strong></Col>
              <Col span={12} style={{textAlign:"center"}}>{item.hoursOpen}</Col>
            </Row>
          </List.Item>
        )}
      />


  );
}

export default VendorAvatar;
