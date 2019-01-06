import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Icon } from 'antd';
import axios from 'axios';


const FormItem = Form.Item;

class NewItem extends React.Component{
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
        <div className="newItemComponent">
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

            <FormItem label="Name" >

              {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Please input name of product',
                  }],
                })(
                <Input name="name" placeholder="Enter Name" />
              )}
            </FormItem>

            <FormItem label="InStockQty">
              <InputNumber name="inStockQty" min={1} max={10000} />
              <span className="ant-form-text">qty</span>
            </FormItem>

            <FormItem label="Color">
              <Input name="color"  placeholder="Enter the colors you see!" />
            </FormItem>

            <FormItem label="AgeRequirement">
              <InputNumber name="ageRequirement" min={1} max={10000} />
              <span className="ant-form-text">+</span>
            </FormItem>

            <FormItem label="PurchasedPrice">
              <InputNumber name="purchasedPrice" min={0} max={10000} step={0.1} onChange={this.onChange} />
            </FormItem>

            <FormItem label="SalePrice">
              <InputNumber name="salePrice" min={0} max={10000} step={0.1} onChange={this.onChange} />
            </FormItem>

            <FormItem label="Department">
              <Input name="department"  placeholder="Enter the department!" />
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

const WrappedItemForm = Form.create()(NewItem);

export default withRouter(connect(mapStateToProps)(WrappedItemForm));
