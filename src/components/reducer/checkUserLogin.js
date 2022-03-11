const checkUserLogin = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userId: action.payload.userId,
        userName: action.payload.userName,
        userToken: action.payload.userToken
      };
    case "LOGOUT":
      return {
        userId: action.payload.userId,
        userName: action.payload.userName,
        userToken: action.payload.userToken
      };
    default:
      return state;
  }
};
export default checkUserLogin;
