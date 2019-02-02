// when creating a item update state and post to db
// sale tax has to be dynamically based on location geo-location AND api call

import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../store/actions/auth';
import OutgoingItemAvatar from './avatar/OutgoingAvatar';
import TotalTable from './cart/TotalTable';
import 'antd/dist/antd.css';
import { Row, Col , Icon } from 'antd';



class Outgoing extends React.Component{

  state={
    query:'',
    soldItems:[],
    cart:[],
    cartSubtotal:0,
    cartTax:0,
    cartTotal: 0,


  }

  componentDidMount(){

    this.setItems()

  }

  // adding to cart
  setToCart=(barcode)=>{
    const tempSoldItems = [...this.state.soldItems]
    // prevents if error if item is not found // could set it into var so it dont repeat
    if(this.getItem(barcode) == null){
      return;
    }

    // if item was scanned increment quantity
    if(this.isDuplicateCart(barcode)){
      this.increment(barcode)
      return
    }

    const index = tempSoldItems.indexOf(this.getItem(barcode))
    const item = tempSoldItems[index]

    // setting the initial values
    item.quantity = 1;
    item.transactionType = "outgoing"
    const price = item.salePrice;
    item.tax = .0975;
    item.itemSaleTotal = price;


    this.setState(()=>{
      return { soldItems: tempSoldItems, cart:[...this.state.cart, item]}
    },
    ()=>{this.addTotal()})

  }

  // incrementing the quantity of products
  increment = (barcode)=>{
    let tempCart =[...this.state.cart]
    const duplicateItem = tempCart.find(item=>item.barcode === barcode)
    const index = tempCart.indexOf(duplicateItem)
    const item = tempCart[index]

    item.quantity = item.quantity + 1;
    const sum = item.quantity * item.salePrice;
    item.itemSaleTotal = sum;


    this.setState(()=>{
      return { cart:[...tempCart]}
    },
    ()=>{this.addTotal()})
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

  decrement = (barcode) =>{
    let tempCart = [...this.state.cart]
    const selectedItem = tempCart.find(item=>item.barcode===barcode)
    const index = tempCart.indexOf(selectedItem)
    const item  = tempCart[index]

    item.quantity = item.quantity-1;

    if(item.quantity ==0){
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

  clearCart=()=>{
      this.setState(()=>{
        return {cart:[]}
      },()=>{
        //callback function
        // new originalfresh copy of all the items rather than referencing
        // all the modify object are set to default
        this.setItems();
        this.addTotal();
      });
  }

// ============ Helper methods ====================
  // find items from copy of items
  getItem =(barcode)=>{
    const item = this.state.soldItems.find(item=> item.barcode===barcode);
    if(item){
      return item
    }

      return null
  }

  // defines whether item is already in cart
  isDuplicateCart=(barcode)=>{
    let duplicate
    duplicate = this.state.cart.find(item=> item.barcode === barcode)
    return duplicate
  }

  // set state a copy from state items
  setItems=()=>{

    // we are copying the values not referencing items
    // getting a new set of values rather than copying them
    let soldItems =[];

    this.props.items.forEach(item=>{
      const singleItem = {...item}
      soldItems = [...soldItems, singleItem]
    })

    this.setState(()=>{
      return {soldItems}
    });

  }

  removeItem=(barcode)=>{
    let tempItems = [...this.state.soldItems];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.barcode !== barcode)

    const index =  tempItems.indexOf(this.getItem(barcode))
    // remove item based on the index
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
    let subTotal = 0
    this.state.cart.map(item=>(subTotal += item.itemSaleTotal));
    const tempTax = subTotal * .0975;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(()=>{
      return{
      cartSubtotal:subTotal,
      cartTax:tax,
      cartTotal:total
    }
    })

  }

  render(){
      return(
        <div className="outgoingComponent">

        <Row>
          <Col span={12}>
            <DebounceInput
            minLength={5}
            debounceTimeout={300}
            onClick={(event => event.target.select())}
            placeholder="Outgoing: Scan Item"
            style={{ width: "100%", border: "1px solid #ccc", font:"sans-serif"}}
            onChange={ (event) =>{
              this.updateQuery(event.target.value)}}
              />
          </Col>

          {
            this.state.cart.length > 0 ?
            <div>
              <Col span={8} style={{position: "absolute",right: "0"}}>
                <TotalTable total={this.state.cartTotal}
                            subTotal={this.state.cartSubtotal}
                            tax={this.state.cartTax}
                            clearCart={this.clearCart}/>
                <div className="empty-cart" onClick={()=>this.clearCart()}
                     style={{fontFamily: "Permanent Marker",
                             color:"#cc0000",
                             width:"7rem"}}>
                    <Icon type="delete" style={{color:"#cc0000"}}/>
                        EmptyCart
                </div>
              </Col>

            </div>

            :
            ""
          }
          </Row>

          <OutgoingItemAvatar
          data={this.state.cart}
          increment={this.increment}
          decrement={this.decrement}
          />

        </div>



      );
  }
}


const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    items: state.items,
    isAuthenticated: state.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Outgoing));
