import React from 'react';

import { Button } from 'antd';


class Inventory extends React.Component{
render(){
    return(

      <div>
        <Button block>Item</Button>
        <Button block>New Item</Button>
        <Button block>Count Cycle</Button>
        <Button block>Damage Item</Button>
      </div>


    );
}
}

export default Inventory;
