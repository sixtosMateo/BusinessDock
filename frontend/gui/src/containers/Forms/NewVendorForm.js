import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import * as actions from '../../store/actions/auth';
import serializeForm from 'form-serialize';
import axios from 'axios';


const FormItem = Form.Item;

class NewVendor extends React.Component{
  state = {
    confirmDirty: false,

  }

  createVendor(vendor){
    axios.post('http://127.0.0.1:8000/api/vendors/', vendor)
    .then(function (response) {
      // console.log(response)
      if(response.status === 201){
        console.log("Success Vendor was submit")
      }
    })
    this.props.history.push('/vendors/')
  }

  editVendor(vendor){

    axios.put(`http://127.0.0.1:8000/api/vendors/${this.props.vendor.vendorId}/`, vendor)
    .then(function (response) {
      if(response.status === 200){
        console.log("Success Vendor was Edit")
      }
    })
    this.props.history.push('/vendors/')
  }

  componentDidMount(){
   this.props.refreshVendors();
  }

  handleSubmit = (e) =>{

      e.preventDefault()

      const values = serializeForm(e.target, // e.target is the from itself
      {
        hash: true
      })
      // need to check if values has content
      if(this.props.vendor){
        this.editVendor(values)
      }else{
        this.createVendor(values);
      }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator} = this.props.form;

      return(
        <div className="newVendorComponent">

          <Form onSubmit={this.handleSubmit}>
            <FormItem label="Name" >

              {getFieldDecorator('name', {
                  initialValue: this.props.vendor ? this.props.vendor.name :"",
                  rules: [{
                    required: true,
                    message: 'Please input name of the vendor!',
                  }],
                })

                (
                <Input name="name" placeholder="Enter Name"/>
              )}
            </FormItem>

            <Form.Item label="Phone Number">
               {getFieldDecorator('phoneNumber', {
                 initialValue: this.props.vendor ? this.props.vendor.phoneNumber :"",
                 rules: [{ required: true, message: 'Please input your phone number!' }],
               })(
                 <Input name="phoneNumber" placeholder="(###)###-####"  style={{ width: '100%' }}/>
               )}
             </Form.Item>

            <FormItem label="Address">

            {getFieldDecorator('address', {
              initialValue: this.props.vendor ? this.props.vendor.address :"",
            })(
              <Input name="address"  placeholder="Enter the address!" />
              )}
            </FormItem>

            <FormItem label="Hours Open">
              {getFieldDecorator('hoursOpen', {
                initialValue: this.props.vendor ? this.props.vendor.hoursOpen :"",
              })(
              <Input name="hoursOpen"  placeholder="Enter times the vendor is open!" />
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" style={{marginRight:"5px", marginLeft:"5px"}}>Submit</Button>

              <Button type="danger" onClick={()=>this.props.history.push('/vendors/')} style={{background:"#e50000", color:"#e5e5e5"}}>Danger</Button>
            </FormItem>

          </Form>

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

const WrappedItemForm = Form.create()(NewVendor);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
