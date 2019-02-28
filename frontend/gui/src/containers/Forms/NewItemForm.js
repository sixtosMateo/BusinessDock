// IN THE STATE WE CAN HAVE AN ARRAY OF BARCODE TO INDENTIFY WHETHER ITEM EXIST OR NOT
// maybe keep the button disable till all the necessary items are filled


import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../store/actions/auth';
import serializeForm from 'form-serialize';


const FormItem = Form.Item;

class NewItem extends React.Component{
  state = {
    confirmDirty: false,

  };

  createItem(item){
    axios.post('http://127.0.0.1:8000/api/items/', item)
    .then(function (response) {
      // console.log(response)
      if(response.status === 201){
        window.location.reload()
        console.log("Success item was submit")
      }
    })

  }
  // console.log(values)
  // axios.post('http://127.0.0.1:8000/api/items/', values).then(res => console.log(res))
  //   .catch(error => console.log(error));


  handleSubmit=(e)=>{
      e.preventDefault()
      const values = serializeForm(e.target, // e.target is the from itself
      {
        hash: true
      })

      // need to check if values has content
      this.createItem(values)


  }


  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="newItemComponent">

          <Form onSubmit={this.handleSubmit} >
            <FormItem label="Barcode" >

              {getFieldDecorator('barcode', {
                  initialValue: this.props.item.barcode,
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
                initialValue: this.props.item.name,
                  rules: [{
                    required: true,
                    message: 'Please input name of product',
                  }],
                })(
                <Input name="name" placeholder="Enter Name" />
              )}
            </FormItem>

            <FormItem label="InStockQty">
            {getFieldDecorator('inStockQty', {
              initialValue: this.props.item.inStockQty,

              })(
              <InputNumber name="inStockQty" min={1} max={10000} />
              )}
              <span className="ant-form-text">qty</span>

            </FormItem>

            <FormItem label="Color">
            {getFieldDecorator('color', {
              initialValue: this.props.item.color,

              })(
              <Input name="color"  placeholder="Enter the colors you see!" />
              )}
            </FormItem>

            <FormItem label="AgeRequirement">
            {getFieldDecorator('ageRequirement', {
              initialValue: this.props.item.ageRequirement,
              })(
                <Input name="ageRequirement" placeholder="Enter Age require"  />
              )}
              <span className="ant-form-text">+</span>
            </FormItem>

            <FormItem label="PurchasedPrice">
            {getFieldDecorator('purchasedPrice', {
              initialValue: this.props.item.purchasedPrice,

              })(
                <InputNumber name="purchasedPrice" min={0} max={10000} step={0.1} onChange={this.onChange} />
              )}
            </FormItem>

            <FormItem label="SalePrice">
            {getFieldDecorator('salePrice', {
              initialValue: this.props.item.salePrice,

              })(
                <InputNumber name="salePrice" min={0} max={10000} step={0.1} onChange={this.onChange} />
              )}
            </FormItem>

            <FormItem label="Department">
            {getFieldDecorator('department', {
              initialValue: this.props.item.department,
              })(
              <Input name="department"  placeholder="Enter the department!" />
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" style={{marginRight:"5px"}}>Submit</Button>
              <Button type="danger" onClick={()=>this.props.history.push('/inventory/')} style={{background:"#e50000", color:"#e5e5e5"}}>Danger</Button>
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
const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

const WrappedItemForm = Form.create()(NewItem);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
