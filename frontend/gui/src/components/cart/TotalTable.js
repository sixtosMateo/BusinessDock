import React from 'react';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class TotalTable extends React.Component{
  render(){
      return(
        <div className="total-table">
          <div>
            <div style={{fontFamily: "Permanent Marker"}}><h3>Subtotal: {this.props.subTotal}</h3></div>
            <div style={{fontFamily: "Permanent Marker"}}><h3>Tax: {this.props.tax}</h3></div>
            <div style={{fontFamily: "Permanent Marker"}}><h3>Total: {this.props.total}</h3></div>
          </div>
        </div>

      );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapDispatchToProps)(TotalTable));
