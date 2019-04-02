import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Icon } from 'antd';
import axios from 'axios';
import serializeForm from 'form-serialize';

const FormItem = Form.Item;

class NewEmployee extends React.Component{
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) =>{
    e.preventDefault()
    console.log(e.target)
    const values = serializeForm(e.target, // e.target is the from itself
    {
      hash: true
    })
    console.log(values)

    // if(values){
    //     axios.post('http://127.0.0.1:8000/api/outgoingTransaction/', values)
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
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
                <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
                <Input name="password2" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>

            <FormItem label="is_staff">
            {getFieldDecorator('is_staff', {
            })(
              <Switch name="isStaff" />
            )}
            </FormItem>

            <FormItem  label="is_active">
              {getFieldDecorator('is_active', {
                valuePropName: 'checked'
              })(
                <Switch name="is_active"/>
              )}
            </FormItem>

            <FormItem label="StoreId">
              <InputNumber name="storeId" min={1} max={100000} />
            </FormItem>

            <FormItem label="EmploymentType">
              <Input name="employmentType"  placeholder="Part-Time / Full-Time" />
            </FormItem>

            <FormItem label="Birthdate">
               <DatePicker name="birthdate"/>
            </FormItem>

            <FormItem label="Age">
              <InputNumber min={1} max={110} name="age"/>
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

const mapStateToProps = ({AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    token: AuthReducer.token
  }
}
export default withRouter(connect(mapStateToProps)(WrappedRegistrationForm));
