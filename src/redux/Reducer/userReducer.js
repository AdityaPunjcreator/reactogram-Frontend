const initialState = {
  user: {},
};
const userReducer = (state = initialState, action) => {
  if (action.type === "LOGIN_SUCCESS") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "LOGIN_ERROR") {
    return {
      ...initialState,
    };
  }

  return state;
};

export default userReducer;
