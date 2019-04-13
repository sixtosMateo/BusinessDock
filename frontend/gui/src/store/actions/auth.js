import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as ItemsApi from '../../api/getItemsRequest';
// import * as DamageItemsApi  from '../../api/getDamageItemRequest';
import * as EmployeesApi from '../../api/getEmployeesRequest';
// import * as IncomingsApi from '../../api/getIncomingRequest';
// import * as OutgoingsApi from '../../api/getOutgoingRequest';
import * as VendorsApi from '../../api/getVendorsRequest';
import * as UsersApi from '../../api/getUserRequest';
import * as CurrentUserApi from '../../api/getCurrentUserRequest';
import * as DamageItemApi from '../../api/getDamageItemRequest';
import * as helper from '../../helperMethods/UpdateLocalStorage';

import * as PostItemsApi from '../../api/postItems';
import * as PostVendorsApi from '../../api/postVendors';
import * as PostDamageItemsApi from '../../api/postDamageItems';

// Reducers methods: Authentication methods

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
//########################################################################
// Reducers method: initialize state array

export const initialCurrentUser = user =>{
  return{
    type: actionTypes.ADD_USER,
    currentUser: user}
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

export const initializeEmployeeCombo = combinedEmployee =>{
  return {
    type: actionTypes.COMBINED_EMPLOYEE,
    combinedEmployee: combinedEmployee
  }
}

export const initializeDamageItem = damageItem =>{
  return {
    type: actionTypes.DAMAGE_ITEM,
    damageItem: damageItem
  }
}

//########################################################################
// Reducers method: with CRUD operations for Items and Vendor

export const addItem =(item)=>{
  return {
    type: actionTypes.ADD_ITEM,
    item: item
  }
}

export const editItem = (id, updates)=>{
  return {
    type: actionTypes.EDIT_ITEM,
    id: id,
    updates: updates
  }
}

export const deleteItem = (id)=>{
  return {
    type: actionTypes.DELETE_ITEM,
    id: id,
  }
}

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

export const addDamageItem =(damageItem)=>{
  return {
    type: actionTypes.ADD_DAMAGE_ITEM,
    damageItem: damageItem
  }
}

//########################################################################
// DB (API) and CACHE DELETION (localStorage)
export const addDamageItemLocalStorage = (damageItem) =>{
  return dispatch => {
    PostDamageItemsApi
    .postDamageItem(damageItem)
    .then(function (response) {
      if(response.status === 201){
        dispatch(addDamageItem(response.data))
        helper.addDamageItemLocalStorage('localDamageItems',response.data)
      }
    })
  }
}

export const addVendorLocalStorage = (vendor) =>{
  return dispatch => {
    PostVendorsApi
    .postVendor()
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

export const addItemLocalStorage = (item) =>{
  return dispatch=>{
    PostItemsApi
    .postItem(item)
    .then(function (response) {
      if(response.status === 201){
        dispatch(addItem(response.data))
        helper.addLocalStorage('localItems',response.data)
      }
      return response.data
    })
    .catch(err => {
      console.log(err)
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

export const editItemLocalStorage = (id, item) =>{
  return dispatch =>{
    axios.put(`http://127.0.0.1:8000/api/items/${id}/`, item)
    .then(function (response) {
        helper.editItemLocalStorage('localItems', id, response.data)
        dispatch(editItem(id, response.data))
    })
  }
}

//########################################################################
// Fetching data from API calls

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

export const fetchDamageItem = () =>{
  return dispatch => (
  DamageItemApi
      .fetchDamageItems()
      .then((res)=>
      {
        localStorage.setItem('localDamageItems', JSON.stringify(res))
      })
)}

export const fetchCurrentUser = () =>{
  return dispatch => (
  CurrentUserApi
      .fetchCurrentUser()
      .then((res)=>
      {
        dispatch(initialCurrentUser(res))
      })
)}



//########################################################################
// data from local storage and dispatching action types with new state

export const reloadEmployeeCombo=()=>{
  return dispatch => {
      const users = JSON.parse(localStorage.getItem('localUsers'));
      const employees = JSON.parse(localStorage.getItem('localEmployees'));

      let tempArray = employees

      users.forEach((user)=>{
       const matchEmployee = employees.find(employee => employee.userId === user.id)
       const index = tempArray.indexOf(matchEmployee)
       const item = tempArray[index]

       item.first_name = user.first_name
       item.last_name = user.last_name
       item.username = user.username
       item.email = user.email
       item.is_staff = user.is_staff
       item.date_joined = user.date_joined
    })
      dispatch(initializeEmployeeCombo(tempArray))
  }
}

export const reloadLocalUsers=()=>{
  return dispatch=>{
      const users = JSON.parse(localStorage.getItem('localUsers'));
      dispatch(initializeUsers(users))
  }
}

export const reloadDamageItems=()=>{
  return dispatch=>{
      const damageItem = JSON.parse(localStorage.getItem('localDamageItems'));
      dispatch(initializeDamageItem(damageItem))
  }
}

export const reloadLocalEmployees=()=>{
  return dispatch=>{
      const employees = JSON.parse(localStorage.getItem('localEmployees'));
      dispatch(initializeEmployees(employees))
  }
}

export const reloadLocalItems=()=>{
  return dispatch=>{
      const items = JSON.parse(localStorage.getItem('localItems'));
      dispatch(initializeItems(items))
  }
}

export const reloadLocalVendors=()=>{
  return dispatch=>{
      const vendors = JSON.parse(localStorage.getItem('localVendors'));
      dispatch(initializeVendors(vendors))
  }
}

export const reloadCurrentUser=()=>{
  return dispatch=>{
      const currentUser = localStorage.getItem('currentUser');
      dispatch(initialCurrentUser(JSON.parse(currentUser)))
  }
}

//########################################################################


// Login Authentication and authorization methods
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
      dispatch(fetchCurrentUser())
      // 3600 seconds times 1000 gives 1hr
      dispatch(checkAuthTimeout(3600));

    })
    .catch(err => {
        dispatch(authFail(err))
    })
  }
}

export const logout = () =>{
  localStorage.removeItem('currentUser');
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
