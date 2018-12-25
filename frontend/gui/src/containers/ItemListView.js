import React from 'react';
import Items from '../components/Items';
import axios from 'axios';

import {connect} from 'react-redux';

class ItemList extends React.Component{
 state ={
   items:[]
 }

 componentWillReceiveProps(newProps){
   // this is to validate token authentication
   //setting token into my hearders
   // this is to authenticate the request
   // we cant use componentDidMount because the moment the token is authenticate
       // the hearders will set token into null
   // componentWillReceiveProps(newProps) - this function will receive the state token
     // whether the user login or logout


   // ensures that if the token was changed  then executed the code

   console.log(newProps);

   if(newProps.token){
     axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: newProps.token,

     }

     axios.get('http://127.0.0.1:8000/api/')
       .then(res => {
         this.setState({
           items: res.data
         });
           console.log(res.data);
       })
   }


 }
  render(){
    return (
      <div>
        <Items data={this.state.items}/>
        <br />
      </div>
    )
  }
}

const mapStateToProps = state =>{
 // return object is what you want to map into a property
 return{
   token: state.token
 }
}



export default connect(mapStateToProps)(ItemList);
