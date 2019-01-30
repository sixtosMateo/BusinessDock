import React from 'react';
import { List } from 'antd';
import { Icon, Row, Col} from 'antd';

const IncomingItemAvatar =(props)=>{
  const {increment, decrement} = props;
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

              <Icon type="minus" onClick={()=> decrement(item.barcode)}
                style={{ fontSize: '16px', color: '#ff0000' }}/>

                {item.quantity}

              <Icon type="plus" onClick={()=> increment(item.barcode)}
                style={{ fontSize: '16px', color: '#0000ff'}}/>
          </List.Item>
        )}
      />

    </div>
  );
}

export default IncomingItemAvatar;
