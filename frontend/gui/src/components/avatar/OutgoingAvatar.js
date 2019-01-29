import React from 'react';
import { List, Icon} from 'antd';


const OutgoingItemAvatar =(props)=>{

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
            <div>
              <Icon type="minus" onClick={()=> decrement(item.barcode)}
                style={{ fontSize: '16px', color: '#ff0000', border:"solid 1px" }}/>
              {  item.quantity  }
              <Icon type="plus" onClick={()=> increment(item.barcode)}
                style={{ fontSize: '16px', color: '#0000ff', border:"solid 1px" }}/>
            </div>
            <div>{item.salePrice}</div>
            {item.itemSaleTotal}
            
          </List.Item>
        )}
      />

    </div>
  );
}

export default OutgoingItemAvatar;
