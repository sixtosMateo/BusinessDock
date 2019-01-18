import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as ItemsApi from '../../api/getItemsRequest';
import * as DamageItemsApi  from '../../api/getDamageItemRequest';
import * as EmployeesApi from '../../api/getEmployeesRequest';
import * as IncomingsApi from '../../api/getIncomingRequest';
import * as OutgoingsApi from '../../api/getOutgoingRequest';
import * as VendorsApi from '../../api/getVendorsRequest';



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

// Fetching Items information
export const initializeItems = items =>{
  return {
    type: actionTypes.FETCH_ITEMS,
    items: items
  }
}

export const initializeEmployees = employees =>{
  return {
    type: actionTypes.FETCH_EMPLOYEES,
    employees: employees
  }
}

export const initializeVendors = vendors =>{
  return {
    type: actionTypes.FETCH_VENDORS,
    vendors: vendors
  }
}


export const fetchItems = () =>
dispatch => (
  ItemsApi
      .fetchItems()
      .then((res)=>
      {
        dispatch(initializeItems(res))
        localStorage.setItem('localItems', res)
      })

)

export const fetchEmployees = () =>
dispatch => (
  EmployeesApi
      .fetchEmployees()
      .then((res)=> {
        dispatch(initializeEmployees(res))
        localStorage.setItem('localEmployees', res)
      })

)

export const fetchVendors = () =>
dispatch => (
  VendorsApi
      .fetchVendors()
      .then((res) =>{
        dispatch(initializeVendors(res))
        localStorage.setItem('localVendors', res)
      })
)

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
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);

      // if res is successful dispatch authSuccess method with toke as args
      dispatch(authSuccess(token));
      // 3600 seconds times 1000 gives 1hr
      dispatch(checkAuthTimeout(3600));

    })
    .catch(err => {
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
