// new item or edit item change state
// have an db parameter determines whether its on the floor or not // backend work too

import React from 'react';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import ItemAvatar from './avatar/ItemAvatar';




class Damage extends React.Component{

  state ={
    query:  '',

  }

  componentDidMount(){
      this.props.refreshDamageItems();
  }

  render(){
      return(

        <div className="DamageItemComponent">
          {console.log(this.props.damageItem)}
        </div>
      )
  }
}


const mapStateToProps = ({DamageItemReducer,  AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    damageItem: DamageItemReducer.damageItem,
    isAuthenticated:  AuthReducer.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshDamageItems: () => dispatch(actions.reloadDamageItems()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Damage));
