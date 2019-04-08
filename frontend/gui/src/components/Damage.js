// new item or edit item change state
// have an db parameter determines whether its on the floor or not // backend work too

import React from 'react';
import { Input } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import DamageItemAvatar from './avatar/DamageItemAvatar';


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
          <Link to="/inventory/newDamageItem/">new damage</Link>
          <DamageItemAvatar data={this.props.damageItem}/>
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
