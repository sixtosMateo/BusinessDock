import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';


class TotalTable extends React.Component{
render(){
    return(
      <div className="total-table">

      <div>{this.props.subTotal}</div>
      <div>{this.props.tax}</div>
      <div>{this.props.total}</div>

      </div>


    );
}
}

export default TotalTable;
