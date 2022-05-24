const AuthReducer = (state, action) => {
    switch (action.type) {
      case "Login": {
        return {
            CurrentUser: action.payload,
        };
      }
      case "Logout": {
        return {
            CurrentUser: null,
        };
      }
     
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  