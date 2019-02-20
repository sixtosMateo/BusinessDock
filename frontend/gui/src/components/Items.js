// new item or edit item change state

import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import ItemAvatar from './avatar/ItemAvatar';


const Search = Input.Search;

class Items extends React.Component{

  state ={
    query:  ''
  }

  componentDidMount(){
      this.props.refreshItems();
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }


  render(){
    let showingItems
      const {items} = this.props

      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingItems = items.filter((item) =>
        match.test(item.barcode))
      }
      else{
        showingItems = items
      }
      showingItems.sort(sortBy('itemId'))

      return(

        <div className="ItemComponent">
          <Search
            placeholder="Search Item"
            value={this.state.query}
            onClick={(event => event.target.select())}
            onChange={(event) => this.updateQuery(event.target.value)}
            />

            <ItemAvatar data={showingItems} />
        </div>
      )
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
      refreshItems: () => dispatch(actions.reloadLocalItems())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Items));
