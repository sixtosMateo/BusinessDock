import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { combineReducers } from 'redux';

const initialState={
  employees:[]
}


const initialEmployees =(state, action)=>{
  return updateObject(state, {
    employees: action.employees
  });

}

const EmployeeReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_EMPLOYEES: return initialEmployees(state, action);
        break;
      default:
        return state;
  }
}

export default EmployeeReducer;
