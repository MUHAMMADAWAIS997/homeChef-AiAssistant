import React, { useContext,useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import AuthContext from '../../context/Auth context/AuthContext';
import { wishContext } from '../../context/wishlist/wishListContext';
import {getWishList,deleteWishList} from '../../hooks/wishlistapi'
export default function WishList({ isOpen, onClose }) {
  const {isAuthenticated,token} = useContext(AuthContext); 
  const {fav,addtoFav}=useContext(wishContext)
  useEffect(() => {
    const data=getWishList(token)
    
  },[token]);
  if (!isOpen) return null;

  return (
    <div>
      <div
        className={`absolute rounded right-42 top-12 w-3xs bg-gray-100 shadow-2xl px-6 py-10  z-50 transition-all duration-200`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 leftt-3 hover:text-red-500 transition"
        >
          <X />
        </button>
        {isAuthenticated ? (
          <div>
            <h1 className="text-red-600 text-xl text-center font-bold">WishList</h1>
            <h3 className="justify-self-center m-1 text-red-600  rounded-full">
              <Heart size={40} fill='red'/>
            </h3>
            <h3 className="relative text-gray-800 font-semibold mb-1">
              User Name: <p className='relative text-center text-md font-normal'>Awais</p> 
            </h3>
              <h3 className="relative text-gray-800 font-semibold mb-1">
              Email: <p className='relative text-center text-md font-normal'>awais@gmail.com</p> 
            </h3>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            🔒 Login to view WishList
          </p>
        )}
      </div>
    </div>
  );
}
