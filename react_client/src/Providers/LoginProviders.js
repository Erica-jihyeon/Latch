import { useState, createContext } from "react";
import CurrentUser from "./LoginInput";


//create context
export const loginContext = createContext();

//Create a Component wrapper
export default function LoginProvider (props) {

  //Shared State Object

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);


  const login = (username, password, userId) => {
    //check user in db
    setAuth(true);
    setUser({username: username, userId: userId});
  }

  const logout = () => {
    setAuth(false);
    setUser(null);
  }

  const changeUsername = function(username) {
    //update the user in db
    setUser({...user, username})
  };

  const userInitial = () => {
    if (user) {
      return user.username[0];
    }
  }


  //can get use Reducer can be better
  const providerData = {user, auth, login, logout, changeUsername, userInitial};

  //the place we need to warp
  return (
    <loginContext.Provider value={providerData}>
      {props.children}
    </loginContext.Provider>
  )
}