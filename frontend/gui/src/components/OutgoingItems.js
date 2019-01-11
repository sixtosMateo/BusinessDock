import React from 'react';
import { List, Avatar, Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const OutgoingItemAvatar =(props)=>{
  return(
    <div>
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
            key={item.barcode}
            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}

          >


            <List.Item.Meta
              title={item.barcode}
              description={item.quantity}
            />
            {item.name}
          </List.Item>
        )}
      />

    </div>
  );
}

export default OutgoingItemAvatar;
