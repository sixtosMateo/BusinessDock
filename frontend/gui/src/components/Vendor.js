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
import DeleteModel from './general/DeleteModel';
const Search = Input.Search;


class Vendor extends React.Component{
  state={
    query:'',
    modelOpen: false,
    deleteId:null,
    deleteName:""
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }

  componentDidMount(){
      this.props.refreshVendors();
  }

  openModel=(id, name)=>{
    console.log("open")
    this.setState(()=>{
      return { modelOpen:true,
              deleteId:id,
              deleteName: name}
    })
  }

  closeModel=()=>{
    this.setState({
      modelOpen:false
    })
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

          <VendorAvatar data={showingVendors} openModel={this.openModel} />

          {
            this.state.modelOpen  ?

            <DeleteModel closeModel={this.closeModel} id={this.state.deleteId} name={this.state.deleteName} />:""

          }


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
