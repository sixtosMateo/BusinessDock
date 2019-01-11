// instead of calling all my items eveytime they come to this page why not
// call the items when login this can be ddone in a higher level Component

// when creating a item update state and post to db

import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import { Input } from 'antd';
import axios from 'axios';


class Outgoing extends React.Component{
  state={
    items:[],
    query:'',
    purchasedItems:{}
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
        query: query
      })

    }

  render(){
      return(
        <div className="outgoingComponent">
        <DebounceInput
        minLength={5}
        onChange={event => this.updateQuery(event.target.value)} />

        <p>Value: {this.state.query}</p>

        </div>

      );
  }
}

export default Outgoing;
