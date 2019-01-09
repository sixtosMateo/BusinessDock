import React from 'react';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import { Link, withRouter } from 'react-router-dom';
import { List, Input, Breadcrumb, Avatar, Icon} from 'antd';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import VendorAvatar from './VendorAvatar';
const Search = Input.Search;

class Vendor extends React.Component{
  state={
    vendors:[],
    query:''
  }

  componentDidMount(){

      axios.get('http://127.0.0.1:8000/api/vendors/')
        .then(res => {
          this.setState({
            vendors: res.data
          });
        })
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }


  render(){
    let showingVendors

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingVendors = this.state.vendors.filter((item) =>
        match.test(item.name))
      }
      else{
        showingVendors = this.state.vendors
      }

      showingVendors .sort(sortBy('name'))


      return(
        <div className="vendorComponent">

          <Search
            placeholder="Search Vendor"
            value={this.state.query}
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
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps)(Vendor));
