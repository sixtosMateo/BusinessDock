import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  vendors:[]
}

const initialVendors = (state, action)=>{
  return updateObject(state, {
    vendors: action.vendors
  });
}

const addingVendor = (state,action)=>{
  return updateObject(state,{
    vendors: state.vendors.concat(action.vendor)
  })
}

const editingVendor = (state, action)=>{
  return updateObject(
    state,
    {
      vendors: state.vendors.map((vendor) =>{
        if(vendor.vendorId === action.id ){
          return {
            ...vendor,
            ...action.updates,
          }
        }
        else{
          return vendor
        }
      })
    }
  )
}

const deletingVendor = (state, action)=>{

  return updateObject(
    state,{
      vendors: state.vendors.filter(vendor=> vendor.vendorId !== action.id)
    })
}

const VendorReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_VENDORS: return initialVendors(state, action);
      case actionTypes.ADD_VENDOR: return addingVendor(state, action);
      case actionTypes.EDIT_VENDOR: return editingVendor(state, action);
      case actionTypes.DELETE_VENDOR: return deletingVendor(state, action);
      default:
        return state;
  }
}

export default VendorReducer;
