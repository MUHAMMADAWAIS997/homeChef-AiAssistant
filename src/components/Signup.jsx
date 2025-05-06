import { EyeOffIcon,Mail,EyeIcon } from "lucide-react";
import {React,useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(props){
     const [darkMode, setDarkMode] = useState(false);
        const [hide,setHide]=useState(true)
    
    return(
        <>
        
        <div className="bg-white shadow-2xl items-center border-[#DBDBDD] h-120 w-80 justify-self-center mt-8 pt-5">
            <p className="text-3xl font-mono text-center font-bold">Signup</p>
            <p>Register a new account!</p>
            <div className=" text-20 text-left w-full mt-10 flex-col pl-5  pr-2">
            <h1 >Email</h1>
                <input className='float-left w-60 border-[#DBDBDD] border-b-2 hover:border-b-gray-300 mb-5 mr-2 focus:outline-none'  type="email" name="email" id="mail" />
                <span className='float right text-gray-500 '><Mail/></span>
              
                <h1 > Pasword</h1>
                <input className='float-left w-60 border-[#DBDBDD] border-b-2 hover:border-b-gray-300 mb-5 mr-2  focus:outline-none' type={hide? "password":"text"} name="passBox" id="pass" />
                <span className='float right text-gray-500 '  onClick={()=>setHide(!hide)}>
                    {hide? <EyeOffIcon/>:<EyeIcon/>}
                </span>
                <h1 >Confirm Pasword</h1>
                <input className='float-left w-60 border-[#DBDBDD] border-b-2 hover:border-b-gray-300 mr-2 focus:outline-none' type={hide? "password":"text"} name="ConpassBox" id="conpass" />
                <span className='float right text-gray-500 '  onClick={()=>setHide(!hide)}>
                    {hide? <EyeOffIcon/>:<EyeIcon/>}
                </span>
                <button  className={`${props.Mode? 'bg-gray-900 text-white hover:bg-gray-950 hover:text-white border-2 border-gray-850':'bg-sky-400 border-2 border-sky-500 text-white hover:bg-sky-500 hover:text-white' } w-full justify-self-center-center h-10 text-2xl text-center  mt-6 rounded  `} >
                    Signup
                </button>
            </div>
           
            <p>Don't have an account?<Link className='underline text-sky-900' to="/">Signin</Link>
                
                </p>
        </div>
       </>
    )

}