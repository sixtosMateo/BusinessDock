import { combineReducers } from 'redux';
import VendorReducer from './VendorsReducer';
import AuthReducer from './auth';
import ItemReducer from './ItemsReducer';
import EmployeeReducer from './EmployeesReducer'
import UserReducer from './UsersReducer';
import CombinedEmployee from './CombineEmployee';
import DamageItem from './DamageItem';

export default combineReducers({
  VendorReducer,
  AuthReducer,
  ItemReducer,
  EmployeeReducer,
  UserReducer,
  CombinedEmployee,
  DamageItem
})
