// new item or edit item change state 

import React from 'react';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import VendorAvatar from './avatar/VendorAvatar';
import * as actions from '../store/actions/auth';
const Search = Input.Search;


class Vendor extends React.Component{
  state={
    query:''
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }

  componentDidMount(){
      this.props.refreshVendors();
  }



  render(){
    let showingVendors
    const {vendors} = this.props

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingVendors = vendors.filter((vendor) =>
        match.test(vendor.name))
      }
      else{
        showingVendors = vendors
      }

      showingVendors.sort(sortBy('name'))


      return(
        <div className="vendorComponent">

          <Search
            placeholder="Search Vendor"
            value={this.state.query}
            onClick={(event => event.target.select())}
            onChange={(event) => this.updateQuery(event.target.value)}
            />

          <VendorAvatar data={showingVendors} />
        </div>

      );
  }
}

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    vendors: state.vendors
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshVendors: () => dispatch(actions.reloadLocalVendors())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vendor));
