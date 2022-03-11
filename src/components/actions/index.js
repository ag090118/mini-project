export const loginFunc = (userId, userName, userToken) => {
  return {
    type: "LOGIN",
    payload: {
      userId,
      userName,
      userToken
    }
  };
};
export const logoutFunc = () => {
  return {
    type: "LOGOUT",
    payload: {
      userId: null,
      userName: null,
      userToken: null
    }
  };
};
