import { useState } from "react";
import AuthContext from "./AuthContext";
const AuthState = (props) => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MGRkMzNjZGIzNGMzNjQ1YWQyZDgyIn0sImlhdCI6MTc1MTE3OTY2OX0.LCMuC22mcqBZCR7F4uwsvFeztF-FHj5gx0ddGuCWhfI");
    
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