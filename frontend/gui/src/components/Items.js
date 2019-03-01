// new item or edit item change state
// have an db parameter determines whether its on the floor or not // backend work too

import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import ItemAvatar from './avatar/ItemAvatar';
import ItemDashboard from './avatar/ItemDashboard';
import DeleteModel from './general/DeleteModel';

const Search = Input.Search;

class Items extends React.Component{

  state ={
    query:  '',
    deleteId:null,
    deleteName:"",
    modelOpen:false
  }

  componentDidMount(){
      this.props.refreshItems();
  }

  updateQuery=(query)=>{
    this.setState({
      query: query.trim()
    })
  }

  openModel=(id, name)=>{
    this.setState(()=>{
      return { modelOpen:true,
              deleteId:id,
              deleteName: name}
    })
  }

  closeModel=()=>{
    this.setState({
      modelOpen:false
    })
  }

  deleteRecord=(id)=>{
    axios.delete(`http://127.0.0.1:8000/api/items/${id}/`)
    .then(function (response) {
      if(response.status == 204){
        console.log("items was delete")
      }

    })
    this.closeModel()
    this.props.history.push('/inventory/')
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

            <ItemDashboard/>

            <ItemAvatar data={showingItems} openModel={this.openModel} />

            {
              this.state.modelOpen  ?

              <DeleteModel closeModel={this.closeModel}
                           deleteRecord={this.deleteRecord}
                           id={this.state.deleteId}
                           name={this.state.deleteName} />:""

            }
        </div>
      )
  }
}


const mapStateToProps = ({ItemReducer,  AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    items: ItemReducer.items,
    isAuthenticated:  AuthReducer.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshItems: () => dispatch(actions.reloadLocalItems())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Items));
