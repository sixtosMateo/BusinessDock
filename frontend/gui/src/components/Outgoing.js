// instead of calling all my items eveytime they come to this page why not
// call the items when login this can be ddone in a higher level Component

// when creating a item update state and post to db
// sale tax has to be dynamically based on location geo-location AND api call

// need OutgoingItemAvatar to be in a in scroll table

import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import { Input } from 'antd';
import axios from 'axios';
import OutgoingItemAvatar from './OutgoingItems'


class Outgoing extends React.Component{
  state={
    items:[],
    query:'',
    soldItems:[]
  }


  componentDidMount(){
      axios.get('http://127.0.0.1:8000/api/items/')
        .then(res => {
          this.setState({
            items: res.data
          });
        })
  }


  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      let item

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        // ITEM IS A ARRAY OF ITEMS THAT MATCH BARCODE TO QUERY
        item = this.state.items.filter((item) =>
          match.test(item.barcode)
        )
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
                    "transactionType": "outgoing", "quantity": 1,
                    "price": item.salePrice, "tax": 0.0925,
                    "itemSaleTotal": parseFloat((item.salePrice + item.salePrice * 0.0925).toFixed(2))}

      this.setState({
        soldItems: [...this.state.soldItems, newItem]
      })
    }



  }


  render(){
      return(
        <div className="outgoingComponent">
          <DebounceInput
          minLength={5}
          debounceTimeout={300}
          placeholder="Outgoing: Scan Item"
          style={{ width: "100%", border: "1px solid #ccc", font:"sans-serif"}}
          onChange={event => this.updateQuery(event.target.value)} />

          <OutgoingItemAvatar data={this.state.soldItems}/>
        </div>



      );
  }
}

export default Outgoing;
