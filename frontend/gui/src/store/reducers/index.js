import { combineReducers } from 'redux';
import VendorReducer from './VendorsReducer';
import AuthReducer from './auth';
import ItemReducer from './ItemsReducer';
import EmployeeReducer from './EmployeesReducer'
import UserReducer from './UsersReducer';
import CombinedEmployee from './CombineEmployee';
import DamageItemReducer from './DamageItemReducer';

export default combineReducers({
  VendorReducer,
  AuthReducer,
  ItemReducer,
  EmployeeReducer,
  UserReducer,
  CombinedEmployee,
  DamageItemReducer
})
