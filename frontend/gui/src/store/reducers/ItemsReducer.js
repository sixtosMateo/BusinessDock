import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';



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

const editingItem = (state, action)=>{
  return updateObject(
    state,
    {
      items: state.items.map((item) =>{
        if(item.itemId === action.id ){
          return {
            ...item,
            ...action.updates,
          }
        }
        else{
          return item
        }
      })
    }
  )
}


const ItemReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_ITEMS: return initialItems(state, action);
      case actionTypes.DELETE_ITEM: return deletingItem(state, action);
      case actionTypes.ADD_ITEM: return addingItem(state, action);
      case actionTypes.EDIT_ITEM: return editingItem(state, action);
      default:
        return state;
  }
}

export default ItemReducer;
