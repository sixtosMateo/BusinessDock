import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Icon } from 'antd';
import axios from 'axios';


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
