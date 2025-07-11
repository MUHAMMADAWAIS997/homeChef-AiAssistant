import React, { useContext, useEffect, useState } from 'react';
import { X, UserCircle, User, Mail } from 'lucide-react';
import AuthContext from '../../context/Auth context/AuthContext';
export default function Account({ isOpen, onClose }) {
  const BASE_API = import.meta.env.VITE_BASE_API
  const [user, setUser] = useState(null)
  const { isAuthenticated, token } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_API}auth/getUser`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
        })
        const res = await response.json()
        if (response.ok) {
          setUser(res)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (token) {
      fetchUser()
    }
  }, [token]);
  if (!isOpen) return null;

  return (
    <div>
      <div
        onMouseLeave={onClose}
        className={`absolute right-0 mx-5 my-7 w-3xs max-w-md bg-gray-50 shadow-2xl px-6 py-10  z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-blue-500 transition"
        >
          <X />
        </button>
        {isAuthenticated && user ? (
          <div>
            <h1 className="text-blue-600 text-2xl text-center font-bold">Your Profile</h1>
            <h3 className="justify-self-center m-5 text-blue-600">
              <UserCircle size={40} />
            </h3>
            <h3 className=" flex gap-1 text-blue-800 font-semibold mb-1">
              <User />Name:
            </h3>
            <p className='block text-center text-md font-normal'>{user.name}</p>
            <h3 className="flex gap-1 text-blue-800 font-semibold mb-1">
              <Mail /> Email: </h3>
            <p className='relative text-center text-md font-normal'>{user.email}</p>

          </div>

        ) : (
          <p className="text-center text-gray-600 text-sm">
            🔒 Login to view profile
          </p>
        )}
      </div>
    </div>
  );
}
