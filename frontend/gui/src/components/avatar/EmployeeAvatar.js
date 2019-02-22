//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const EmployeeAvatar =(props)=>{
  return(
      <List
        itemLayout="vertical"
        size="medium"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.data}

        renderItem={item => (
          <List.Item
            key={item.employeeId}
            actions={[]}
            extra={<img width={175} style={{margin:"0", padding:"0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta/>
            <Row style={{}}>
              <Col xs={18} sm={14} md={12} lg={12} style={{}}><h2>{item.first_name} {item.last_name}</h2> </Col>
              <Col xs={18} sm={14} md={12} lg={12} style={{textAlign:"right"}}><strong>Hired Date:</strong> {item.date_joined}</Col>
            </Row>

            <Row style={{ marginLeft:"10px", marginBotton:"10px", background:"#F5F5F5"}}>
              <Col xs={18} sm={14} md={12} lg={12} style={{textAlign:"center"}}>
                <span><strong>Username:</strong></span> {item.username}
              </Col>
              <Col xs={18} sm={14} md={12} lg={12} style={{ textAlign:"center"}}>
                <span><strong>Employee Id:</strong></span> {item.employeeId}
              </Col>
            </Row>

            <Row style={{}}>
              <Col xs={18} sm={14} md={12} lg={12} style={{ textAlign:"right"}}>
                <span><strong>Store ID:</strong></span> {item.storeId}
              </Col>
              <Col xs={18} sm={14} md={12} lg={12} style={{textAlign:"right"}}>
                <span><strong>Type:</strong></span> {item.employmentType}
              </Col>
            </Row>

          </List.Item>
        )}
      />


  );
}



export default EmployeeAvatar;
