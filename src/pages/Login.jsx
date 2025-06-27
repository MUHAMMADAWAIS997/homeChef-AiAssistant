import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Mail, Lock, Eye, EyeOff ,LogIn} from 'lucide-react';
import { toast } from 'react-toastify';

export default function Login() {
  const [data, setData] = useState({ email: "", password: ""});

  const handleChange= (e)=>{
      setData({...data,[e.target.name]:e.target.value})
    }
    const [showPass, setShowPass] = useState(false);
    const togglePass=()=>{
      setShowPass(!showPass)
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };
  return (
    <>
    <div className={` bg-surface -mt-10 min-h-screen flex items-center justify-center`}>
      <div className={` bg-white/80  p-8 shadow-lg text-left  w-full max-w-sm`}>
         <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-15 justify-self-center"
          />
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your Email:</label>
          <div className="flex items-center border  rounded px-3 py-2">
            <Mail className="mr-2" />
            <input
              type="email"
              name='email'
              required
              
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              className="w-full bg-transparent focus:outline-none"
            />
            
          </div>
          <label htmlFor="password">Enter Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input
            

              type={showPass?"text":"password" }
              name='password'
              required
              minLength={8}
              placeholder="Password"
              onChange={handleChange}
               value={data.password}
              className="w-full bg-transparent focus:outline-none"
            />
            
            <span onClick={togglePass}>{showPass?<Eye />:<EyeOff/>}</span>
          </div>
          <div className="text-right text-sm">
            <Link to="/forgot" className="text-blue-500 hover:underline">Forgot password?</Link>
          </div>
          
            <button type="submit"  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
              <LogIn className="mr-2" /> Login
            </button>
       
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
    </>
  );
}
