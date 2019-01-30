// what happens when user wants to buy a new item
// i think its best two have two separate table for incoming and outgoing tables
// display table when item is new ask user if they want to add new item
// when user finished scanning the value needs to disapear


import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import IncomingItemAvatar from './IncomingItems';

class Incoming extends React.Component{
  state={
    boughtItems:[],
    query:'',
    cart:[]
  }

  componentDidMount(){
    this.setItems()
  }

  setItems=()=>{
    let boughtItems =[];

    this.props.items.forEach(item=>{
      const singleItem = {...item}
      boughtItems = [...boughtItems, singleItem]
    })

    this.setState(()=>{
      return {boughtItems}
    });

  }

  getItem=(barcode)=>{
    const item = this.state.boughtItems.find(item => item.barcode === barcode)
    if(item){
      return item
    }
    return null
  }

  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      if(this.state.query){
        this.addToCart(this.state.query)
      }

  }

  isDuplicateCart=(barcode)=>{
    let duplicate
    duplicate = this.state.cart.find(item=> item.barcode === barcode)
    return duplicate
  }

  addToCart=(barcode)=>{
    const tempBoughtItems = [...this.state.boughtItems]
    // item not found, we can use this to activate modal
    if(this.getItem(barcode) == null){
      return
    }

    if(this.isDuplicateCart(barcode)){
      // increment
      return
    }

    const index = tempBoughtItems.indexOf(this.getItem(barcode))
    const item = tempBoughtItems[index]

    item.quantity = 1;
    item.transactionType = "incoming"
    const price = item.purchasedPrice;
    item.tax = .0975;
    item.itemSaleTotal = price;

    this.setState(()=>{
      return { boughtItems: tempBoughtItems, cart:[...this.state.cart, item]}
    },
    // ()=>{this.addTotal()}
  )

  }


  render(){
      return(

        <div className="incomingComponent">
          <DebounceInput
          minLength={5}
          debounceTimeout={300}
          onClick={(event => event.target.select())}
          placeholder="Incoming: Scan Item"
          style={{ width: "100%", border: "1px solid #ccc", font:"sans-serif"}}
          onChange={event => this.updateQuery(event.target.value)} />

          <IncomingItemAvatar data={this.state.cart}/>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Incoming));
