import React from 'react';

import { Input } from 'antd';

const Search = Input.Search;

class Employee extends React.Component{
render(){
    return(
      <div className="employeeComponent">
        <Search
        placeholder="Search Employee"
        onSearch={value => console.log(value)}
        enterButton
        />
      </div>


    );
}
}

export default Employee;
