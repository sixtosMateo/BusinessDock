import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { combineReducers } from 'redux';


const initialState={
  items:[]
}

const initialItems =(state, action)=>{
  return updateObject(state, {
    items: action.items
  });

}


const ItemReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_ITEMS: return initialItems(state, action);
        break;
      default:
        return state;
  }
}

export default ItemReducer;
