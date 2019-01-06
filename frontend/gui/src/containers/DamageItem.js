// change in database that employeeId is integer not varchar


import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Icon } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

const FormItem = Form.Item;

class DamageItem extends React.Component{
  state = {
    confirmDirty: false,
  }
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
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator } = this.props.form;

      return(
        <div className="damageItemComponent">
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="Barcode" >

              {getFieldDecorator('barcode', {
                  rules: [{
                    required: true,
                    message: 'Please scan barcode',
                  }],
                })(
                <Input name="barcode" placeholder="Please scan barcode" />
              )}
            </FormItem>

            <FormItem label="EmployeeId">
              {getFieldDecorator('employeeId', {
                  rules: [{
                    required: true,
                    message: 'Enter your employeeId',
                  }],
                })(
                <InputNumber name="employeeId" min={1} max={100000} />
              )}
            </FormItem>

            <FormItem label="StoreId">

              {getFieldDecorator('storeId', {
                  rules: [{
                    required: true,
                    message: 'Enter storeId',
                  }],
                })(
                <InputNumber name="storeId" min={1} max={100000} />
              )}
            </FormItem>

            <FormItem label="LocationId">
              <InputNumber name="locationId" min={1} max={100000} />
            </FormItem>

            <FormItem label="Quantity">
              {getFieldDecorator('quantity', {
                  rules: [{
                    required: true,
                    message: 'Enter the quantity damage',
                  }],
                })(
                <InputNumber name="quantity" min={1} max={10000} />
              )}
              <span className="ant-form-text">qty</span>
            </FormItem>

            <FormItem label="Description">
              {getFieldDecorator('description', {
                  rules: [{
                    required: true,
                    message: 'Describe what happen?',
                  }],
                })(
                <Input name="description" placeholder="Describe what happen?" />
              )}
            </FormItem>
          </Form>

        </div>


      );
  }
}

const WrappedDamageItemForm = Form.create()(DamageItem);

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps)(WrappedDamageItemForm));
