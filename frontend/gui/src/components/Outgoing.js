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
import OutgoingItemAvatar from './OutgoingItems'


class Outgoing extends React.Component{

  state={
    query:'',
    soldItems:[],
    cart:[]
  }


  componentDidMount(){
    this.setItems()
  }

  getItem =(barcode)=>{
    const item = this.state.soldItems.find(item=> item.barcode===barcode);
    if(item){
      return item
    }
    else{
      return null
    }
  }

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

  setToCart=(barcode)=>{
    const tempSoldItems = [...this.state.soldItems]
    // prevents if error if item is not found // could set it into var so it dont repeat
    if(this.getItem(barcode) == null){
      return;
    }
    const index = tempSoldItems.indexOf(this.getItem(barcode))
    const item = tempSoldItems[index]


    // item.quantity =1;
    // const price = item.price;
    // item.total = price;


    this.setState(()=>{
      return { soldItems:tempSoldItems, cart:[...this.state.cart, item]}
    })

  }



  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      if(this.state.query){
        this.setToCart(this.state.query);
      }
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

          <OutgoingItemAvatar data={this.state.cart}/>
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
