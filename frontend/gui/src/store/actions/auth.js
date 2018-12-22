// define methods that takes place on receiving those action

import * as actionTypes from './actionTypes';
import axios from 'axios';

// actions are executed with dispatch and return a type and maybe other args to
// reducers



// when working with actions the objects that need to return always need to
// return a type. Therefore, type property needs to be include
export const authStart = () =>{
  return{
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = token =>{
  return{
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
}

export const authFail = error =>{
  return{
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}
