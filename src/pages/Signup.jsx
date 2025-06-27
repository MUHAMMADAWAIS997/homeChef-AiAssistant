import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Mail, Lock, Eye, EyeOff ,LogIn, User} from 'lucide-react';
export default function Signup() {
    const [data, setData] = useState({name:'', email: "", password: ""});
    const [conPass, setconPass] = useState('');
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
   <div className={` min-h-screen flex items-center justify-center`}>
      <div className={` bg-white/80  p-8 shadow-lg text-left  w-full max-w-sm`}>
       <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-15 justify-self-center"
          />
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your Name:</label>
          <div className="flex items-center border  rounded px-3 py-2">
            <User className="mr-2" />
            <input
              type="text"
              name='name'
              required
              
              placeholder="Full Name"
              onChange={handleChange}
              value={data.name}
              className="w-full bg-transparent focus:outline-none"
            />
            
          </div>
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
          <label htmlFor="cpassword">Confirm Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input
              type={showPass?"text":"password" }
              name='cpassword'
              required
              minLength={8}
              placeholder="Confirm Password"
              onChange={(e)=>{
                setconPass(e.target.value)
              }}
               value={conPass}
              className="w-full bg-transparent focus:outline-none"
            />
            
          </div>
          
          
            <button type="submit"  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
              <LogIn className="mr-2" /> Register
            </button>
       
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
   </>
  );
}
