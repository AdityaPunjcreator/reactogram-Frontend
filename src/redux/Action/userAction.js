const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

const loginError = () => {
  return {
    type: "LOGIN_ERROR",
  };
};

export { loginSuccess, loginError }; // different approach of exporting
