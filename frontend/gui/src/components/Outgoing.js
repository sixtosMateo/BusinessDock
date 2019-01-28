// instead of calling all my items eveytime they come to this page why not
// call the items when login this can be ddone in a higher level Component

// when creating a item update state and post to db
// sale tax has to be dynamically based on location geo-location AND api call

// need OutgoingItemAvatar to be in a in scroll table

import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../store/actions/auth';
import OutgoingItemAvatar from './avatar/OutgoingAvatar';


class Outgoing extends React.Component{

  state={
    query:'',
    soldItems:[],
    cart:[]
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

    if(this.isDuplicateCart(barcode)){
      this.increment(barcode)
      return
    }

    const index = tempSoldItems.indexOf(this.getItem(barcode))
    const item = tempSoldItems[index]

    // setting the initial values
    item.quantity = 1;

    this.setState(()=>{
      return { soldItems:tempSoldItems, cart:[...this.state.cart, item]}
    })

  }

  // incrementing the quantity of products
  increment = (barcode)=>{
    let tempCart =[...this.state.cart]
    const duplicateItem = tempCart.find(item=>item.barcode === barcode)
    const index = tempCart.indexOf(duplicateItem)
    const item = tempCart[index]

    item.quantity = item.quantity + 1

    this.setState(()=>{
      return { cart:[...tempCart]}
    })
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
    const selectedItem = tempCart.find(item=>item.barcode===barcode);

    const index = tempCart.indexOf(selectedItem)

    const item  = tempCart[index]

    item.quantity = item.quantity-1;

    if(item.quantity ==0){
      this.removeItem(barcode)
    }
    else{
      // item.total = item.count * item.price

      this.setState(()=>{
        return {cart:[...tempCart]}},
        // ()=>{this.addTotal()}
      )
    }
  }



// ============ Helper methods ====================
  // find items from copy of items
  getItem =(barcode)=>{
    const item = this.state.soldItems.find(item=> item.barcode===barcode);
    if(item){
      return item
    }
    else{
      return null
    }
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
    // let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.barcode !== barcode)

    // const index =  tempProducts.indexOf(this.getItem(id))
    // remove item based on the index
    // let removedItem = tempProducts[index]

  // this the overall products and setting the values to defaut
    // removedItem.inCart = false
    // removedItem.count = 0
    // removedItem.total = 0

    this.setState(()=>{
      return {
        cart:[...tempCart],
        // product:[...tempProducts]
      }
    },
    // ()=> {this.addTotal()}
  )
  }

  render(){
      return(
        <div className="outgoingComponent">
          <DebounceInput
          minLength={5}
          debounceTimeout={300}
          onClick={(event => event.target.select())}
          placeholder="Outgoing: Scan Item"
          style={{ width: "100%", border: "1px solid #ccc", font:"sans-serif"}}
          onChange={ (event) =>{
            this.updateQuery(event.target.value)}}
            />
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
