import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Icon } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class NewEmployee extends React.Component{
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
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
      const { getFieldDecorator } = this.props.form;

      return(
        <div className="newEmployeeComponent">
          <Form onSubmit={this.handleSubmit}>

            <FormItem label="FirstName" >

              {getFieldDecorator('firstname', {
                  rules: [{
                    required: true,
                    message: 'Please input your first name',
                  }],
                })(
                <Input name="fName" placeholder="Enter First Name" />
              )}
            </FormItem>

            <FormItem label="LastName" >

              {getFieldDecorator('lastname', {
                  rules: [{
                    required: true,
                    message: 'Please input your last name',
                  }],
                })(
                <Input name="lName" placeholder="Enter Last Name" />
              )}
            </FormItem>

            <FormItem label="Username" >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>

            <FormItem label="Email" >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email"  />
              )}
            </FormItem>


            <FormItem label="Password" >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>

            <FormItem label="Confirm Password" >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>


            <FormItem label="StoreId">
              <Input name="StoreId"  placeholder="Enter StoreId" />
            </FormItem>

            <FormItem label="isStaff">
              <Switch />
            </FormItem>

            <FormItem label="isActive">
              <Switch />
            </FormItem>

            <FormItem label="EmploymentType">
              <Input name="employmentType"  placeholder="Part-Time / Full-Time" />
            </FormItem>

            <FormItem label="Birthdate">
               <DatePicker />
            </FormItem>

            <FormItem label="Age">
              <InputNumber min={1} max={110} />
              <span className="ant-form-text"> years</span>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>

          </Form>
        </div>

      );
  }
}

const WrappedRegistrationForm = Form.create()(NewEmployee);

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}
export default withRouter(connect(mapStateToProps)(WrappedRegistrationForm));
