import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, User } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthContext from '../context/Auth context/AuthContext'

export default function Signup() {
  const BASE_API=import.meta.env.VITE_BASE_API
  const navigate = useNavigate()
  const [data, setData] = useState({ name: '', email: "", password: "" });
  const { login } = useContext(AuthContext)
  const [conPass, setconPass] = useState('');
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass(!showPass)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(conPass!==data.password){
      return toast.error('Both Password must be same')
    }
    try {
     const response=await fetch(`${BASE_API}auth/createUser`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                
            },
            body:JSON.stringify(data)
        })
       const res=await response.json()
      if (response.ok) {
        login(res.token)
        toast.success("Registered successfully")
        navigate('/home')
      }
      else {
        if (Array.isArray(res.error)) {
          res.error.forEach(err => toast.error(err.msg));
        } else {
          toast.error(res.error || "Login failed");
        }
      }
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <>
      <div className={` min-h-screen flex items-center justify-center`}>
        <div className={` bg-gray-50  p-8 sm:shadow-2xl text-left  w-full max-w-sm`}>
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
                type={showPass ? "text" : "password"}
                name='password'
                required
                minLength={8}
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                className="w-full bg-transparent focus:outline-none"
              />

              <span onClick={togglePass}>{showPass ? <Eye /> : <EyeOff />}</span>
            </div>
            <label htmlFor="cpassword">Confirm Password:</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="mr-2" />
              <input
                type={showPass ? "text" : "password"}
                name='cpassword'
                required
                minLength={8}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setconPass(e.target.value)
                }}
                value={conPass}
                className="w-full bg-transparent focus:outline-none"
              />

            </div>


            <button type="submit" className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
              <LogIn className="mr-2" /> Register
            </button>

          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
