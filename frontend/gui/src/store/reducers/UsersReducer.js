import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
  users:[]
}


const initialUsers =(state, action)=>{
  return updateObject(state, {
    users: action.users
  });

}

const UserReducer = (state=initialState, action) =>{
  switch (action.type) {
      case actionTypes.FETCH_USERS: return initialUsers(state, action);
      default:
        return state;
  }
}

export default UserReducer;
