import React from "react";

const AuthContext = React.createContext({
  // default values
  isLoggedIn: false
});

export default AuthContext;