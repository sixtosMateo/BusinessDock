import React from 'react';
import { List, Avatar, Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const IncomingItemAvatar =(props)=>{
  return(
    <div>
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
            <List.Item.Meta
              title={item.barcode}
              description={item.name}/>
            {item.quantity}
          </List.Item>
        )}
      />

    </div>
  );
}

export default IncomingItemAvatar;
