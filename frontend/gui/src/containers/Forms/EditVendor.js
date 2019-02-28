import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewVendor from './NewVendorForm';



class EditVendor extends React.Component{
  state={
    vendor:'',
  }

  componentDidMount(){
    this.props.refreshVendors()

    const vendor = this.props.vendors.find(vendor =>  vendor.vendorId === parseInt(this.props.match.params.id))

    this.setState({
       vendor: vendor
    })

  }
  render(){


    return(
      <div className = "edit-vendor" style={{background:"#F5F5F5"}}>
          <NewVendor/>
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditVendor));
