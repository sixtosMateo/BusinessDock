import React from 'react';
import Items from './Items';
import { Button, Breadcrumb, Input } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
const Search = Input.Search;


class Inventory extends React.Component{


  render(){
      return(
          <div className="inventoryComponent">
              <Items />
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


export default withRouter(connect(mapStateToProps)(Inventory));
