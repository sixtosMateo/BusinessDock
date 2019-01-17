import * as actionTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { updateObject } from '../utility';

// here we define our initial state
    // ex: loading any errors, authentication token

// reducers recieved in the reducer as one of the params then the reducer method
// (at the botton) taking in all the actions. Determines the type of action

const initialState = {
   token: null,
   error: null,
   loading: false,
   items:[],
   employees:[],
   inventory:[],
   vendors:[]
}


const initialItems =(state, action)=>{
  return updateObject(state, {
    items: action.items
  });

}

const initialEmployees =(state, action)=>{
  return updateObject(state, {
    employees: action.employees
  });

}

const initialVendors =(state, action)=>{
  return updateObject(state, {
    vendors: action.vendors
  });

}


const authStart = (state, action) => {
      // error to null and loading to true -> spinner will start spinning
    return updateObject(state, {
      error: null,
      loading: true
    });
}


const authSuccess = (state, action) => {
    // action is from action/actionTypes authSuccess one parameter is token & returns
      // an object therefore being able to grab the token here
    return updateObject(state, {
      token: action.token,
      error: null,
      loading: false
    });
}


const authFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    })
}


const authLogout = (state, action) => {
    return updateObject(state, {
      token: null
    })
}


//define the methods where they take place
const reducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.AUTH_START: return authStart(state, action);
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
      case actionTypes.AUTH_FAIL: return authFail(state, action);
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
      case actionTypes.FETCH_ITEMS: return initialItems(state, action);
      case actionTypes.FETCH_EMPLOYEES: return initialEmployees(state, action);
      case actionTypes.FETCH_VENDORS: return initialVendors(state, action);
      default:
        return state;
  }
}




export default reducer;
