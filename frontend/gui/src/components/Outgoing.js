// sale tax has to be dynamically based on location geo-location AND api call
import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../store/actions/auth';
import OutgoingItemAvatar from './avatar/OutgoingAvatar';
import TotalTable from './cart/TotalTable';
import 'antd/dist/antd.css';
import * as helper from '../helperMethods/TransactionsMethods';
import * as localStorage from '../helperMethods/UpdateLocalStorage';
import ItemModel from './general/ItemModel';
import { Row, Col , Icon, InputNumber, Button } from 'antd';
import * as PostOutgoingApi from '../api/postOutgoing';
import * as PostOutgoingItemApi from '../api/postOutgoingItem';

class Outgoing extends React.Component{

  state={
    query:'',
    cart:[],
    cartSubtotal:0,
    cartTax:0,
    cartTotal: 0,
    error:"",
    itemModel:false,
    modelData:{}
  }

  componentDidMount(){
    this.props.onTryAutoSignup();
    this.props.refreshItems()
    this.props.fetchCurrentUser()
    this.props.refreshEmployees()
  }

  openItemModel=(item)=>{
    this.setState({
      itemModel:true,
      modelData:item
    })
  }

  closeItemModel=()=>{
    this.setState({
      itemModel:false
    })
  }

  // adding to cart
  setToCart=(barcode)=>{
    // prevents if error if item is not found // could set it into var so it dont repeat
    const temp = helper.getItem(barcode, this.props.items)
    if(temp == null){
      this.setState({
        error:"item does not exist"
      })
      return
    }
    else{
      this.setState({
        error:""
      })
    }

    // #############this can be function ############
    if(temp.inStockQty <= 0){
      this.setState({
        error:"out of stock"
      })
      return
    }else{
      this.setState({
        error:""
      })
    }
    //####################################################

    // if item was scanned increment quantity
    if(helper.isDuplicateCart(barcode, this.state.cart)){
      this.increment(barcode)
      return
    }

    const item = helper.initialCartItem(this.props.items, barcode, "outgoing")

    this.setState(()=>{
      return { cart:[...this.state.cart, item]}
    },()=>{this.addTotal()})
  }

  // incrementing the quantity of products
  increment=(barcode)=>{
    const tempCart = helper.increment(this.state.cart, barcode)

    this.setState(()=>{
      return { cart:[...tempCart]}
    }, ()=>{this.addTotal()})
  }

  // updating the query everytime it changes
  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
    if(this.state.query){
      this.setToCart(this.state.query);
    }
  }

  clearCart=()=>{
    this.setState(()=>{
      return {cart:[]}
    },()=>{
      this.addTotal();
    });
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
      item.itemSaleTotal = item.quantity * item.salePrice
      this.setState(()=>{
        return {cart:[...tempCart]}},
        ()=>{this.addTotal()}
      )
    }
  }

  removeItem=(barcode)=>{
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

  addTotal=()=>{
    const cartCost = helper.addTotal(this.state.cart)
    this.setState(()=>{
      return{
        cartSubtotal: cartCost.subTotal,
        cartTax: cartCost.tax,
        cartTotal: cartCost.total
      }
    })

  }

  postTrasanction=()=>{
    PostOutgoingApi
    .postOutgoing(this.props, this.state)
    .then((res)=>{
      this.state.cart.forEach((cartItem)=>{
        PostOutgoingItemApi
        .postOutgoingItem(res.data, cartItem)
        .catch(e=>{
          console.log(e)
        })
      })
    }) //there can be a bug if inStockQty is less than cartitem,
    .then(()=>{
      this.state.cart.forEach((cartItem)=>{
        const editItem = this.props.items.find(item => item.itemId === cartItem.itemId)
        const tempQty = editItem.inStockQty
        editItem.inStockQty = tempQty - cartItem.quantity
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
  const user = this.props.currentUser
  return(
    <div className="outgoingComponent">

      <Row>
        <h2>Clerk: {user ? user.username: ""}</h2>
        <Col sm={12} md={12} lg={12}>
          <h3>EmployeeID:
          <InputNumber
          value={this.props.employee ? this.props.employee.employeeId: ""}
          style={{border:"none",
          color: "#000000",
          backgroundColor:"transparent"}}
          disabled/></h3>
        </Col>
        <Col sm={12} md={12} lg={12} style={{}}>
          <h3 >Store ID:
          <InputNumber
          value={this.props.employee ? this.props.employee.storeId: ""}
          style={{border:"none",
          color: "#000000",
          backgroundColor:"transparent"}}
          disabled/></h3>
        </Col>
      </Row>

      <Row>
        <Col span={12} style={{width:"50%"}}>
          <DebounceInput
          minLength={5}
          debounceTimeout={300}
          onClick={(event => event.target.select())}
          placeholder="Outgoing: Scan Item"
          style={{ width: "100%", border: "1px solid #ccc", font:"sans-serif"}}
          onChange={ (event) =>{
            this.updateQuery(event.target.value)}}
            />
          {
            this.state.error!=""?
            <h3 style={{color:"#ff3232"}}>{this.state.error}</h3>:""
          }
        </Col>

        {
          this.state.cart.length > 0 ?

          <Col span={12} style={{width:"50%", padding:"2px"}}>
            <Col span={12} style={{width:"50%", padding:"2px"}}>

              <Button htmlType="submit"
              onClick={()=>this.postTrasanction()}>
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
                color:"#cc0000"}}/>
                <span style={{color:"#cc0000"}}>ClearCart</span>

              </Button>
            </Col>

            <Col span={12} style={{padding:"1px", width:"50%"}}>
              <TotalTable total={this.state.cartTotal}
              subTotal={this.state.cartSubtotal}
              tax={this.state.cartTax}
              clearCart={this.clearCart}/>
            </Col>
          </Col>:""
        }
        </Row>

        <OutgoingItemAvatar
          data={this.state.cart}
          increment={this.increment}
          decrement={this.decrement}
          removeItem={this.removeItem}
          openItemModel={this.openItemModel}
        />
        {
          this.state.itemModel  ?
          <ItemModel
            item={this.state.modelData}
            closeItemModel = {this.closeItemModel}
            />:""
        }
      </div>
    );
  }
}

const mapStateToProps = ({ItemReducer, EmployeeReducer, AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    employees:  EmployeeReducer.employees,
    employee: EmployeeReducer.employees.find(employee =>
                              employee.userId === AuthReducer.currentUser.pk),
    currentUser: AuthReducer.currentUser,
    items: ItemReducer.items,
    isAuthenticated: AuthReducer.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
    fetchCurrentUser:()=>dispatch(actions.reloadCurrentUser()),
    refreshItems: () => dispatch(actions.reloadLocalItems()),
    refreshEmployees: () => dispatch(actions.reloadLocalEmployees()),
    updateItemQty: (id,item) => dispatch(actions.editItemLocalStorage(id,item)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Outgoing));
