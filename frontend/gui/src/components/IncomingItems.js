import React from 'react';
import { List } from 'antd';

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
