import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Form, Input, Button, InputNumber} from 'antd';
import styled from 'styled-components';
import serializeForm from 'form-serialize';


const FormItem = Form.Item;

class Model extends React.Component{
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur=(e)=> {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    const values = serializeForm(e.target, // e.target is the from itself
    {
      hash: true
    })
    // has to do with a promise situation
    this.props.closeModel()
    this.props.addItem(values)
    // this line prevents from closeModel() function to work
    // this.props.addToCart(this.props.barcode)
  }
  render(){
      const { getFieldDecorator } = this.props.form;

      return(

          <ModelContainer>

                    <div id="modal" style={{width: "75%",
                                            height:"60%",
                                            padding:"20px 20px 20px 20px",
                                            overflow:"auto"}}>
                      <h1>New Item Form</h1>

                      <Button type="danger"
                      style={{background:"#CC3333", color:"#FFFFFF"}}
                      onClick={()=>{
                        this.props.closeModel()
                      }}>Cancel</Button>

                      <Form onSubmit={
                                      this.handleSubmit
                                      }>

                        <FormItem label="Barcode:" >

                          {getFieldDecorator('barcode', {
                              initialValue: this.props.barcode? this.props.barcode:"",
                              rules: [{
                                required: true,
                                message: 'Please scan barcode',
                              }],
                            })(
                            <Input name="barcode" placeholder="Please scan barcode" />
                          )}
                        </FormItem>

                        <FormItem label="Name:" >

                          {getFieldDecorator('name', {
                              rules: [{
                                required: true,
                                message: 'Please input name of product',
                              }],
                            })(
                            <Input name="name" placeholder="Enter Name" />
                          )}
                        </FormItem>

                        <FormItem label="PurchasedPrice:">
                          <InputNumber name="purchasedPrice" min={0} max={10000} step={0.1} onChange={this.onChange} />
                        </FormItem>

                        <FormItem>
                          <Button type="primary" htmlType="submit">Submit</Button>
                          <span>    </span>
                          <Button type="danger"
                          style={{background:"#CC3333", color:"#FFFFFF"}}
                          onClick={()=>{
                            this.props.closeModel()
                          }}>Cancel</Button>
                        </FormItem>

                      </Form>

              </div>
          </ModelContainer>

      );
    }
}

const ModelContainer= styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,0.3);
  display:flex;
  align-items:center;
  justify-content: center;
  #modal{
    background: #f3f3f3
  }
`



const mapDispatchToProps = dispatch =>{
  return {
      refreshItems: () => dispatch(actions.reloadLocalItems()),
      addItem:(item)=>dispatch(actions.addItemLocalStorage(item)),

  }
}

const mapStateToProps = ({AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    token: AuthReducer.token
  }
}
const WrappedItemForm = Form.create()(Model)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
