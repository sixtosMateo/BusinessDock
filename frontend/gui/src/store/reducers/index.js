import { combineReducers } from 'redux';
import { updateObject } from '../utility';
import VendorReducer from './VendorsReducer';
import AuthReducer from './auth';
import ItemReducer from './ItemsReducer';
import EmployeeReducer from './EmployeesReducer'
import UserReducer from './UsersReducer'

export default combineReducers({
  VendorReducer,
  AuthReducer,
  ItemReducer,
  EmployeeReducer,
  UserReducer
})
