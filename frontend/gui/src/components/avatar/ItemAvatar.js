import React from 'react';
import { List,
  Icon } from 'antd';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const ItemAvatar =(props)=>{
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
            key={item.barcode}
            actions={[]}
            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta
              title={item.barcode}
              description={item.inStockQty}
            />
            {item.name}
          </List.Item>
        )}
      />


  );
}

export default ItemAvatar;
