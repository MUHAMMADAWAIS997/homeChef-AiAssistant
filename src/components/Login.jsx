import {React,useState} from "react";
import { Link } from "react-router-dom";
import {EyeIcon,Mail,EyeOffIcon} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn(props){
    const [hide,setHide]=useState(true)
    const handleLogin=()=>{
        const email = document.getElementById("mail").value;
        const password = document.getElementById("pass").value;
    
        if (!email || !password) {
          toast.error("Please fill in both fields.");
          return;
    }
    else{
        toast.success("Login Successfully!")

    }
}
    return(
        <>
        <div className="bg-white shadow-2xl items-center border-[#DBDBDD] h-100 w-80 justify-self-center mt-8 pt-5">
            <p className="text-3xl font-mono text-center font-bold">Login</p>
            <p>Welcome back!</p>
            <div className=" text-20 text-left w-full mt-10 flex-col pl-5  pr-2">
                <h1 >Email</h1>
                <input className='float-left w-60 border-[#DBDBDD] border-b-2 hover:border-b-gray-300 focus:outline-none mb-5 ml-2 mr-2'  type="email" name="email" id="mail" />
                <span className='float right text-gray-500 '><Mail/></span>
              
                <h1 > Pasword</h1>
                <input className='float-left w-60 border-[#DBDBDD] border-b-2 hover:border-b-gray-300 focus:outline-none ml-2 mr-2' type={hide? "password":"text"} name="passBox" id="pass" />
                <span className='float right text-gray-500 '  onClick={()=>setHide(!hide)}>
                    {hide? <EyeOffIcon/>:<EyeIcon/>}
                </span>
                
                <button  onClick={handleLogin}  className={`${props.Mode? 'bg-gray-900 text-white hover:bg-gray-950 hover:text-white border-2 border-gray-800':'bg-sky-400 border-2 border-sky-500 text-white hover:bg-sky-500 hover:text-white' } w-full h-10 text-2xl text-center mb-2 mt-6 rounded  `} >
                    Login
                </button>
                
                
                
            </div>
            <p>Don't have an account?<Link className='underline text-sky-900' to="/register">Signup</Link>
            </p>
        </div>
        <ToastContainer position="bottom-right" autoClose='1500'/>
       </>
    )

}