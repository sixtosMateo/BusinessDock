import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  combinedEmployee:[]
}

const initialCombo =(state, action)=>{
  return updateObject(state, {
    combinedEmployee: action.combinedEmployee
  });
}

const CombinedEmployee = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.COMBINED_EMPLOYEE: return initialCombo(state, action);
      default:
        return state;
  }
}

export default CombinedEmployee;
