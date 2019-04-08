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

const DamageItem = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.DAMAGE_ITEM: return initialDamageItem(state, action);
      default:
        return state;
  }
}

export default DamageItem;
