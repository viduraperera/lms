import { FETCH_USERS } from "../constants/constant";

const UserReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action?.payload };
    default:
      return state;
  }
};

export default UserReducer;
