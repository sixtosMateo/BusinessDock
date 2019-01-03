import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';

const Search = Input.Search;

class Inventory extends React.Component{

render(){
    return(
        <div className="inventoryComponent">
        <Search
        placeholder="Search Item"
        onSearch={value => console.log(value)}
        enterButton
        />
        </div>




    );
}
}

export default Inventory;
