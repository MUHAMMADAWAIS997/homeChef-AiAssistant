import React from 'react';
import { X,UserCircle, User, Mail } from 'lucide-react';

export default function Account({ isOpen, onClose }) {
  const isAuthenticated = true; // or use actual auth logic

  if (!isOpen) return null;

  return (
    <div>
      <div
        className={`absolute rounded-2xl right-0 mx-5 my-7 w-3xs max-w-md bg-gray-100 shadow-2xl px-6 py-10  z-50 transition-all duration-200`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-blue-500 transition"
        >
          <X />
        </button>
        {isAuthenticated ? (
          <div>
            <h1 className="text-blue-600 text-2xl text-center font-bold">Your Profile</h1>
            <h3 className="justify-self-center m-5 text-blue-600">
              <UserCircle size={40} />
            </h3>
            <h3 className=" flex gap-1 text-blue-800 font-semibold mb-1">
             <User/>Name:  
            </h3>
            <p className='block text-center text-md font-normal'>Awais</p>
              <h3 className="flex gap-1 text-blue-800 font-semibold mb-1">
             <Mail/> Email: </h3>
              <p className='relative text-center text-md font-normal'>awais@gmail.com</p> 
            
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
