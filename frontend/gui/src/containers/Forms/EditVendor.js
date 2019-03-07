import React from 'react';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NewVendor from './NewVendorForm';


class EditVendor extends React.Component{

  render(){
    return(
     <div className = "edit-vendor" style={{background:"#F5F5F5"}}>

        <NewVendor/>
      </div>
    );
  }
}

const mapStateToProps = ({VendorReducer}, props) => {
    return {
      vendors: VendorReducer.vendors,
      vendor: VendorReducer.vendors.find((vendor) =>
            vendor.vendorId === parseInt(props.match.params.id))
    };
};

const mapDispatchToProps = dispatch =>{
  return {
      refreshVendors: () => dispatch(actions.reloadLocalVendors())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditVendor));
