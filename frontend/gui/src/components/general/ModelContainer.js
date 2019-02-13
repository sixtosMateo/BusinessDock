import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { Form, Input, Button, InputNumber} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import NewEmployee from '../../containers/Forms/NewEmployeeForm';

const FormItem = Form.Item;

class Model extends React.Component{
  state = {
    confirmDirty: false,
  };

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

          <ModelContainer>
                    <div id="modal" style={{width: "60%", height:"100%", marginTop:"30px"}}>

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
          </ModelContainer>

      );
    }
}

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}

const ModelContainer= styled.div`
  position:fixed;
  top:60px;
  left:100px;
  right:100px;
  bottom:200px;
  background: rgb(76, 175, 80);
  display:flex;
  overflow:auto;
  align-items:center;
  justify-content: center;
  background: #C0C0C0;
  #modal{
    background: #C0C0C0;
  }
`

const WrappedItemForm = Form.create()(Model)
export default withRouter(connect(mapStateToProps)(WrappedItemForm));
