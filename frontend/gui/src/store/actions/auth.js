import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as ItemsApi from '../../api/getItemsRequest';
// import * as DamageItemsApi  from '../../api/getDamageItemRequest';
import * as EmployeesApi from '../../api/getEmployeesRequest';
// import * as IncomingsApi from '../../api/getIncomingRequest';
// import * as OutgoingsApi from '../../api/getOutgoingRequest';
import * as VendorsApi from '../../api/getVendorsRequest';
import * as UsersApi from '../../api/getUserRequest';
import * as helper from '../../helperMethods/UpdateLocalStorage';



// action types
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

export const initializeUsers = users =>{
  return {
    type: actionTypes.FETCH_USERS,
    users: users
}
}

export const addItem =(item)=>{
  return {
    type: actionTypes.ADD_ITEM,
    item: item
  }
}

export const deleteItem = (id)=>{
  return {
    type: actionTypes.DELETE_ITEM,
    id: id,
  }
}

export const addItemLocalStorage = (item) =>{
  return dispatch=>{
    axios.post('http://127.0.0.1:8000/api/items/', item)
    .then(function (response) {

      if(response.status === 201){
        dispatch(addItem(response.data))
        helper.addLocalStorage('localItems',response.data)
      }
    })
  }
}

export const deleteItemLocalStorage = (id)=>{
  return dispatch =>{
    axios.delete(`http://127.0.0.1:8000/api/items/${id}/`)
    .then(res => {
        dispatch(deleteItem(id))
        helper.deleteItemLocalStorage('localItems', id)
    })
  }
}


// Vendor CRUD operations
export const addVendor = (vendor)=>{
  return {
    type: actionTypes.ADD_VENDOR,
    vendor: vendor
  }
}

export const editVendor = (id, updates)=>{
  return {
    type: actionTypes.EDIT_VENDOR,
    id: id,
    updates: updates
  }
}

export const deleteVendor = (id)=>{
  return {
    type: actionTypes.DELETE_VENDOR,
    id: id,
  }
}

// DB and CACHE DELETION
export const addVendorLocalStorage = (vendor) =>{
  return dispatch => {
    axios.post('http://127.0.0.1:8000/api/vendors/', vendor)
    .then(function (response) {
      if(response.status === 201){
        dispatch(addVendor(response.data))
        helper.addLocalStorage('localVendors',response.data)
      }
    })
  }
}


export const editVendorLocalStorage = (id, vendor) =>{
  return dispatch =>{
    axios.put(`http://127.0.0.1:8000/api/vendors/${id}/`, vendor)
    .then(function (response) {
      if(response.status === 200){
        dispatch(editVendor(id, response.data))
        helper.editVendorLocalStorage('localVendors', id, response.data)
      }
    })
  }
}

export const deleteVendorLocalStorage = (id) =>{
  return dispatch =>{
    axios.delete(`http://127.0.0.1:8000/api/vendors/${id}/`)
    .then(res => {
      dispatch(deleteVendor(id))
      helper.deleteLocalStorage('localVendors', id)
    })

  }
}


// Fetching data from api calls
export const fetchEmployees = () =>{
  return dispatch => (
  EmployeesApi
      .fetchEmployees()
      .then((res)=> {
        localStorage.setItem('localEmployees', JSON.stringify(res))
      })

)
}

export const fetchUsers = () =>{
  return dispatch =>{
    UsersApi
      .fetchUsers()
      .then((res)=>{
        localStorage.setItem('localUsers', JSON.stringify(res))
      })
  }
}

export const fetchItems = () =>{
  return dispatch => (
  ItemsApi
      .fetchItems()
      .then((res)=>
      {
        localStorage.setItem('localItems', JSON.stringify(res))
      })

)}

export const fetchVendors = () =>{
 return dispatch => (
  VendorsApi
      .fetchVendors()
      .then((res) =>{
        localStorage.setItem('localVendors', JSON.stringify(res))
      })
)
}

// data from local storage and dispatching action types with new state

export const reloadLocalUsers=()=>{
  return dispatch=>{
      const users = JSON.parse(localStorage.getItem('localUsers'));
      dispatch(initializeUsers(users))
  }
}

export const reloadLocalItems=()=>{
  return dispatch=>{
      const items = JSON.parse(localStorage.getItem('localItems'));
      dispatch(initializeItems(items))
  }
}

export const reloadLocalEmployees=()=>{
  return dispatch=>{
      const employees = JSON.parse(localStorage.getItem('localEmployees'));
      dispatch(initializeEmployees(employees))
  }
}

export const reloadLocalVendors=()=>{
  return dispatch=>{
      const vendors = JSON.parse(localStorage.getItem('localVendors'));
      dispatch(initializeVendors(vendors))
  }
}


///put login here

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
      dispatch(logout());
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
