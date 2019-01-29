import React from 'react';
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';


class TotalTable extends React.Component{
render(){
    return(
      <div className="total-table" style={{border:"solid 1px" ,float:"right" , width: "150px"}}>
        <div>
          <div style={{fontFamily: "Permanent Marker"}}><h3>Subtotal: {this.props.subTotal}</h3></div>
          <div style={{fontFamily: "Permanent Marker"}}><h3>Tax: {this.props.tax}</h3></div>
          <div style={{fontFamily: "Permanent Marker"}}><h3>Total: {this.props.total}</h3></div>
        </div>
        <div onClick={()=>this.props.clearCart()} style={{fontFamily: "Permanent Marker", color:"#cc0000"}}>
        <Icon type="delete" style={{color:"#cc0000", border: "solid 1px"}}/>Clear Cart</div>
      </div>


    );
}
}

export default TotalTable;
