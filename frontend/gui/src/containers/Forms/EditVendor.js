// vendors/edit/46802 file needs to save the same vendor after refreshing

import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewVendor from './NewVendorForm';


// vendor={this.props.vendor}
// onSubmitBook={() => {
//       // props.dispatch(editBook(props.book.id, book))
//   }}

class EditVendor extends React.Component{

  render(){
    return(
     <div className = "edit-vendor" style={{background:"#F5F5F5"}}>

      <NewVendor/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
      vendors: state.vendors,
      vendor: state.vendors.find((vendor) =>
            vendor.vendorId === parseInt(props.match.params.id))
    };
};

const mapDispatchToProps = dispatch =>{
  return {
      refreshVendors: () => dispatch(actions.reloadLocalVendors())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditVendor));
