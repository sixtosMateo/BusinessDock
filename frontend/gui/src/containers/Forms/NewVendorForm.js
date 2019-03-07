import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import * as actions from '../../store/actions/auth';
import serializeForm from 'form-serialize';

const FormItem = Form.Item;

class NewVendor extends React.Component{
  state = {
    confirmDirty: false,

  }

  createVendor(vendor){
    this.props.addVendor(vendor)
    this.props.history.push('/vendors/')
  }

  // console.log(this.props.vendor.vendorId, vendor)
  // need to guarantee that the form has real data and meets requirements
  editVendor(vendor){
    vendor.vendorId = this.props.vendor.vendorId
    this.props.editVendor(vendor.vendorId, vendor)
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
                  }]
                })(<Input name="name" placeholder="Enter Name"/>
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

const mapStateToProps = ({VendorReducer}, props) => {
    return {
      vendors: VendorReducer.vendors,
      vendor: VendorReducer.vendors.find((vendor) =>
            vendor.vendorId === parseInt(props.match.params.id))
    };
};

const mapDispatchToProps = dispatch =>{
  return {
      refreshVendors: () => dispatch(actions.reloadLocalVendors()),
      editVendor: (id, editObject) => dispatch(actions.editVendorLocalStorage(id, editObject)),
      addVendor:(vendor) => dispatch(actions.addVendorLocalStorage(vendor))
  }
}

const WrappedItemForm = Form.create()(NewVendor);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
