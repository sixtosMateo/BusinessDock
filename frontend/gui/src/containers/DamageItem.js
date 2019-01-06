import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input } from 'antd';


class DamageItem extends React.Component{
  render(){
      return(
        <div className="damageItemComponent">
          Damage Item Form
        </div>


      );
  }
}

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}
export default withRouter(connect(mapStateToProps)(DamageItem));
