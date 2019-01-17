// what happens when user wants to buy a new item
// i think its best two have two separate table for incoming and outgoing tables
// display table when item is new ask user if they want to add new item
// when user finished scanning the value needs to disapear

// INSTEAD OF USING THE FILTER METHOD WE CAN USER THE REDUCE METHOD THAT WILL RETURN ONE ITEM

import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';

import IncomingItemAvatar from './IncomingItems';

class Incoming extends React.Component{
  state={
    items:[],
    query:'',
    purchasedItems:[]
  }

  componentDidMount(){
      axios.get('http://127.0.0.1:8000/api/items/')
        .then(res => {
          this.setState({
            items: res.data
          });
        })
  }

  checkPurchasedItem(purchasedItem) {
    return this.state.purchasedItems.some(item => purchasedItem === item.barcode);
  }

  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      let item

      if(this.state.query){
        if (this.checkPurchasedItem(query) ===  false){
          const match = new RegExp(escapeRegExp(this.state.query), 'i')
          // ITEM IS A ARRAY OF ITEMS THAT MATCH BARCODE TO QUERY
          item = this.state.items.filter((item) =>
            match.test(item.barcode)
          )
        }
        else{
          item=""
        }
      }
      else{
        item = ""
      }

      this.pushItem(item[0])

  }


  pushItem = (item) =>{
    // what happens when the item is repeated
    // quantity needs to change
    // itemSaleTotal needs to change depending on the quantity
    if(item){
      let newItem = {"barcode": item.barcode, "name":item.name,
                    "transactionType": "incoming", "quantity": 1,
                    "price": item.purchasedPrice, "tax": 0.0925,
                    "itemSaleTotal": parseFloat((item.purchasedPrice + item.purchasedPrice * 0.0925).toFixed(2))}

      this.setState({
        purchasedItems: [...this.state.purchasedItems, newItem]
      })
    }
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

          <IncomingItemAvatar data={this.state.purchasedItems}/>
        </div>


      );
}
}

export default Incoming;
