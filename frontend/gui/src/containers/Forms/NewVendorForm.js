import React from 'react';
import { withRouter } from 'react-router-dom';
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
        window.location.reload()
        console.log("Success Vendor was submit")
      }
    })
  }

  handleSubmit = (e) =>{

      e.preventDefault()

      const values = serializeForm(e.target, // e.target is the from itself
      {
        hash: true
      })

      // //console.log(values)
      // need to check if values has content
      this.createVendor(values);
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
                  initialValue: this.props.vendor.name || {},
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
                 initialValue: this.props.vendor.phoneNumber || "",
                 rules: [{ required: true, message: 'Please input your phone number!' }],
               })(
                 <Input name="phoneNumber" placeholder="(###)###-####"  style={{ width: '100%' }}/>
               )}
             </Form.Item>

            <FormItem label="Address">

            {getFieldDecorator('address', {
              initialValue: this.props.vendor.address || ""
            })(
              <Input name="address"  placeholder="Enter the address!" />
              )}
            </FormItem>

            <FormItem label="Hours Open">
              {getFieldDecorator('hoursOpen', {
                initialValue: this.props.vendor.hoursOpen || ""
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

const mapStateToProps = (state, props) =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

const WrappedItemForm = Form.create()(NewVendor);

export default withRouter(connect(mapStateToProps)(WrappedItemForm));
