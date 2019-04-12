// what happens when user wants to buy a new item: display a modal
// i think its best two have two separate table for incoming and outgoing tables
// display table when item is new ask user if they want to add new item
// when user finished scanning the value needs to disapear
import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import IncomingItemAvatar from './avatar/IncomingAvatar';
import TotalTable from './cart/TotalTable';
import { Row, Col , Icon, Select, Button, InputNumber} from 'antd';
import Model from './general/ModelContainer';
import * as helper from '../helperMethods/TransactionsMethods';
import * as localStorage from '../helperMethods/UpdateLocalStorage';

const Option = Select.Option;

class Incoming extends React.Component{
  state={
    query:'',
    vendorId:0,
    cart:[],
    subTotal:0,
    tax:0,
    total:0,
    modelOpen: false,
    confirmDirty: false,
    disabled: true,
    error:""
  }

  componentDidMount(){
    this.props.onTryAutoSignup()
    this.props.refreshItems()
    this.props.refreshVendors()
    this.props.fetchCurrentUser()
    this.props.refreshEmployees()
  }

  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      if(this.state.query){
        this.addToCart(this.state.query)
      }
  }

  addToCart=(barcode)=>{
    // item not found, we can use this to activate modal
    if(helper.getItem(barcode, this.props.items) == null){
      this.openModel()
      return
    }

    if(helper.isDuplicateCart(barcode, this.state.cart)){
      this.increment(barcode)
      return
    }

    const item = helper.initialCartItem(this.props.items, barcode, "incoming")

    this.setState(()=>{
      return {
        cart:[...this.state.cart, item]
      }
    },()=>{this.addTotal()})

  }

  addTotal=()=>{
    const cartCost = helper.addTotal(this.state.cart)

    this.setState(()=>{
      return {
        subTotal: cartCost.subTotal,
        tax: cartCost.tax,
        total: cartCost.total
      }})
  }

  increment=(barcode)=>{
    const tempCart = helper.increment(this.state.cart, barcode)

    this.setState(()=>{
      return { cart:[...tempCart]}
    },
    ()=>{this.addTotal()})
  }

  decrement = (barcode) =>{
    // const tempCart = helper.decrement(this.props.items, this.state.cart, barcode)

    let tempCart = [...this.state.cart]
   const selectedItem = tempCart.find(item=>item.barcode===barcode);

   const index = tempCart.indexOf(selectedItem)

   const item  = tempCart[index]

   item.quantity = item.quantity-1;

   if(item.quantity ===0){
     this.removeItem(barcode)
   }
   else{
     item.itemSaleTotal = item.quantity * item.salePrice;

     this.setState(()=>{
       return {cart:[...tempCart]}},
       ()=>{this.addTotal()}
     )
   }

    }

  removeItem=(barcode)=>{
    // const tempCart = helper.removeItem(this.props.items, this.state.cart, barcode)
     let tempItems = [...this.props.items];
     let tempCart = [...this.state.cart];
     tempCart = tempCart.filter(item => item.barcode !== barcode)

     const index =  tempItems.indexOf(helper.getItem(barcode, this.props.items))
     let removedItem = tempItems[index]

    // this the overall products and setting the values to defaut

     removedItem.quantity = 0
     removedItem.itemSaleTotal = 0

     this.setState(()=>{
       return {
         cart:[...tempCart],
         product:[...tempItems]
       }
     },
     ()=> {this.addTotal()}
    )
  }

  clearCart=()=>{
      this.setState(()=>{
        return {cart:[]}
      },()=>{
        this.addTotal();
      });
  }

  openModel=()=>{
      this.setState(()=>{
        return { modelOpen:true}
      })

  }

  closeModel=()=>{
    this.setState(()=>{
      return { modelOpen:false}
    })
  }

  handleChange=(value)=> {
    this.setState({
      vendorId: value,
      disabled: false,
    })
  }

  postTrasanction = ()=>{

    const incoming ={
      employeeId: this.props.employee.employeeId,
      vendorId: this.state.vendorId,
      tax: this.state.tax,
      subtotal: this.state.subTotal,
      total: this.state.total
    }

    axios.post('http://127.0.0.1:8000/api/incomingTransaction/', incoming)
    .then((res)=>{
      this.state.cart.forEach((cartItem)=>{
        const object={
          transactionId: res.data.transactionId,
          barcode: cartItem.barcode,
          name: cartItem.name,
          transactionType:"incoming",
          quantity: cartItem.quantity,
          price: cartItem.itemSaleTotal,
          tax: Math.round(1000 *(cartItem.itemSaleTotal * cartItem.tax))/1000,
          itemSaleTotal: Math.round(1000 * (cartItem.itemSaleTotal+ (cartItem.itemSaleTotal* cartItem.tax)))/1000
        }
        axios.post(`http://127.0.0.1:8000/api/incomingtransactionItem/${res.data.transactionId}/`, object)
        .catch(e=>{
          console.log(e)
        })
      })
    })
    .then(()=>{
      this.state.cart.forEach((cartItem)=>{
        const editItem = this.props.items.find(item => item.itemId === cartItem.itemId)
        editItem.inStockQty += cartItem.quantity
        this.props.updateItemQty(editItem.itemId, editItem)
        localStorage.editItemLocalStorage('localItems', editItem.itemId, editItem)
      })
    })
    .then(()=>{
      window.location.reload()
    })
    .catch(e=>{
      console.log(e)
    })
  }

  render(){
      const { vendors} = this.props.vendors
      const user = this.props.currentUser

      return(
        <div className="incomingComponent" >

              <h2>Clerk: {user ? user.username: ""}</h2>

              <h3>EmployeeID: <InputNumber value={this.props.employee ? this.props.employee.employeeId: ""}
                                   style={{border:"none",
                                          color: "#000000",
                                          backgroundColor:"transparent"}}
                                   disabled/></h3>

              <Select showSearch
                      placeholder="Select a vendor"
                      style={{ width: 150, marginBottom:"20px" }}
                      onChange={this.handleChange}>
                {
                  vendors.map((vendor)=>{
                    return <Option key={vendor.vendorId}
                                   value={vendor.vendorId}>{vendor.name}
                            </Option>
                  })
                }
              </Select>


          <Row>
            <Col span={12} style={{width:"50%"}}>
                <DebounceInput
                minLength={5}
                debounceTimeout={300}
                onClick={(event => event.target.select())}
                placeholder="Incoming: Scan Item"
                style={{width:"100%",border: "1px solid #ccc", font:"sans-serif"}}
                onChange={event =>
                  this.updateQuery(event.target.value)}/>

            </Col>

            {
              this.state.cart.length > 0 ?

              <Col span={12} style={{width:"50%", padding:"2px"}}>

                  <Col span={12} style={{padding:"1px", width:"50%"}}>
                    <Button onClick={()=>this.postTrasanction()} disabled={this.state.disabled}>
                      <Icon type="shopping-cart"
                            className="submit-cart"
                            style={{fontFamily: "Permanent Marker",
                                    color:"#00AF33"}}/>
                                    <span style={{color:"#00AF33"}}>Submit</span>
                    </Button>

                    <Button type="danger" onClick={()=>this.clearCart()}
                            style={{backgroundColor:"transparent"}}>
                    <Icon type="delete"
                          className="empty-cart"
                          style={{fontFamily: "Permanent Marker",
                                  color:"#cc0000",
                                  }}/>
                                  <span style={{color:"#cc0000"}}>ClearCart</span>
                    </Button>
                  </Col>

                  <Col span={12} style={{padding:"1px", width:"50%"}}>
                    <TotalTable
                      total={this.state.total}
                      subTotal={this.state.subTotal}
                      tax={this.state.tax}
                      clearCart={this.clearCart}/>
                  </Col>
              </Col>:""}
          </Row>

          <IncomingItemAvatar
            data={this.state.cart}
            increment={this.increment}
            decrement={this.decrement}
            removeItem={this.removeItem}
          />

          {
            this.state.modelOpen  ?

            <Model
              closeModel={this.closeModel}
              barcode={this.state.query}
              addToCart={this.addToCart}/>:""
          }
        </div>
      );
    }
}

const mapStateToProps = ({ItemReducer, EmployeeReducer, AuthReducer, VendorReducer}) =>{
  // return object is what you want to map into a property
  return {
    employees:  EmployeeReducer.employees,
    employee: EmployeeReducer.employees.find(employee => employee.userId === AuthReducer.currentUser.pk),
    currentUser: AuthReducer.currentUser,
    items: ItemReducer.items,
    vendors: VendorReducer,
    isAuthenticated: AuthReducer.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
      fetchCurrentUser:()=>dispatch(actions.reloadCurrentUser()),
      refreshItems: () => dispatch(actions.reloadLocalItems()),
      refreshVendors: () => dispatch(actions.reloadLocalVendors()),
      refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
      updateItemQty: (id,item) => dispatch(actions.editItemLocalStorage(id,item)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Incoming));
