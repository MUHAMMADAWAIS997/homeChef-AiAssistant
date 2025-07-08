import { useState } from "react";
import AuthContext from "./AuthContext";
const AuthState = (props) => {
    const [token, setToken] = useState(null);
    
    const login=(token)=>{
        localStorage.setItem('token',token)
        setToken(token)
    }
    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
    }
    const isAuthenticated = !!token
    return (
        <AuthContext.Provider value={{token, login,logout,isAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthState;