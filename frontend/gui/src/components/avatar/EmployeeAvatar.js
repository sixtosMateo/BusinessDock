//item.email
//item.birthDate
//item.age
import React from 'react';
import { List, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom';


const IconTextEdit = ({ type, text, id }) => (
  <span>
  <Link to={`/employee/edit/${id}`}>
    <Icon type={type} style={{ marginRight: 8, marginTop:15, color:"#61B329" }}/>
  </Link>
    {text}
  </span>
);

const IconText = ({ type, text, id }) => (
  <span>
  <Link to={`/employee/edit/${id}`}>
    <Icon type={type} style={{ marginRight: 8, marginTop:15 }}/>
  </Link>
    {text}
  </span>
);

const IconTextOutgoing = ({ type, text, employeeId }) => (
  <span>
  <Link to={`/employee/${employeeId}/outgoing/`}>
    <Icon type={type} style={{ marginRight: 8, marginTop:15 }}/>
  </Link>
    {text}
  </span>
);

const IconTextIncoming = ({ type, text, employeeId }) => (
  <span>
  <Link to={`/employee/${employeeId}/incoming/`}>
    <Icon type={type} style={{ marginRight: 8, marginTop:15 }}/>
  </Link>
    {text}
  </span>
);

const EmployeeAvatar =(props)=>{
  return(
      <List
        style={{overflow:"auto", height: "800px"}}
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
            actions={[<IconTextEdit type="edit" text="Edit Employee" id={item.id}/>,
                      <IconTextOutgoing type="shop" text="Outgoing Transactions" employeeId={item.employeeId}/>,
                      <IconTextIncoming type="shopping" text="Incoming Transactions" employeeId={item.employeeId}/>]}
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
