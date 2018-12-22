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

// this function requires 2 parameters from djangorestframework, currently we
// know 2 parameters but these would be initialized once django backend is setup
export const authLogin = (username, password) =>{
  // when we login we have to return a dispatch
  return dispatch=>{
    dispatch(authStart());

    axios.post(' http://127.0.0.1:8000/rest-auth/login/', {
      username: username,
      password: password
    })
    .then(res=>{
      // response we will receive a key that is return form djangorestframework
      const token = res.data.key;

      // setting up an expirationDate to one hour
      const expirationDate = new Date(new Date().getTime() +3600 * 1000);

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);

      // if res is successful dispatch authSuccess method with toke as args
      dispatch(authSuccess(token));
      console.log('after success');
      // 3600 seconds times 1000 gives 1hr
      dispatch(checkAuthTimeout(3600));

    })
    .catch(err => {
        console.log(authFail(err))
        dispatch(authFail(err))
    })
  }
}

export const logout = () =>{

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return{
      type: actionTypes.AUTH_LOGOUT
  }

}

const checkAuthTimeout = expirationTime =>{
  // setTimeout will be in millisecond so need to turn seconds into milliseconds
  return dispatch =>{

    setTimeout(()=>{
        dispatch(logout());
    }, expirationTime * 1000)
  }
}



export const authCheckState = () =>{
  // check if token is store at local storage if not logout
  // if it is revaluate localStorage
  return dispatch=>{
    const token = localStorage.getItem('token');

    if(token === 'undefined'){
      dispatch(logout);
    }
    else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if(expirationDate <= new Date()){
        dispatch(logout());
      }
      else{
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}


// these methods are important because they are events that signals so that you
  // can do something else
