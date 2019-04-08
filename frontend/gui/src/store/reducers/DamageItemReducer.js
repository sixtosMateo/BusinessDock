import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  damageItem:[]
}

const initialDamageItem =(state, action)=>{
  return updateObject(state, {
    damageItem: action.damageItem
  });
}

const addingDamageItem = (state,action)=>{
  return updateObject(state,{
    damageItem: state.damageItem.concat(action.damageItem)
  })
}

const DamageItemReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.DAMAGE_ITEM: return initialDamageItem(state, action);
      case actionTypes.ADD_DAMAGE_ITEM: return addingDamageItem(state, action);
      default:
        return state;
  }
}

export default DamageItemReducer;
