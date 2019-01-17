import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';



const FormItem = Form.Item;

class NewVendor extends React.Component{
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) =>{

      // e.preventDefault()
      // // serializeForm will do the browser behavior when submitting a form
      // // but instead of serializing into a string and reload the browser
      // // it will the browser
      // const values = serializeForm(e.target, // e.target is the from itself
      // {
      //   hash: true
      // })
      // //console.log(values)
      // // makes sure that the passed something
      // if(this.props.onCreateContact){
      //   this.props.onCreateContact(values);
      // }

  }

  onChange = (value) => {
    console.log('changed', value);
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="newVendorComponent">

          <Form onSubmit={this.handleSubmit}>


            <FormItem label="Name" >

              {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Please input name of the vendor!',
                  }],
                })(
                <Input name="name" placeholder="Enter Name" />
              )}
            </FormItem>

            <Form.Item label="Phone Number">
               {getFieldDecorator('phoneNumber', {
                 rules: [{ required: true, message: 'Please input your phone number!' }],
               })(
                 <Input name="phoneNumber" placeholder="(###)###-####"  style={{ width: '100%' }} />
               )}
             </Form.Item>

            <FormItem label="Address">
              <Input name="address"  placeholder="Enter the address!" />
            </FormItem>

            <FormItem label="Hours Open">
              <Input name="hoursOpen"  placeholder="Enter times the vendor is open!" />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>

          </Form>

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

const WrappedItemForm = Form.create()(NewVendor);

export default withRouter(connect(mapStateToProps)(WrappedItemForm));
