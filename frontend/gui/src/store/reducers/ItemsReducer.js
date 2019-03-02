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

const deletingItem = (state, action)=>{
  return updateObject(
    state,{
      items: state.items.filter(item => item.itemId !== action.id)
    })
}

const addingItem = (state,action)=>{
  return updateObject(state,{
    items: state.items.concat(action.item)
  })
}

const ItemReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_ITEMS: return initialItems(state, action);
      case actionTypes.DELETE_ITEM: return deletingItem(state, action);
      case actionTypes.ADD_ITEM: return addingItem(state, action);

        break;
      default:
        return state;
  }
}

export default ItemReducer;
