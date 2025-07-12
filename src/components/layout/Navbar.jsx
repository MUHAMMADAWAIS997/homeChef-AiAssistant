// Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Info, BookOpen, CalendarCheck, ShoppingCart,
  Bot, LogIn, X, Menu, User, Heart
} from 'lucide-react';
import Account from '../profile/Account';
import WishList from '../wish-cart/Wishlist';
import AuthContext from '../../context/Auth context/AuthContext';
import { wishContext } from '../../context/wishlist/wishListContext';
import { shoplistContext } from '../../context/shoplist/ShoplistContext';

const Navbar = () => {
  const { isAuthenticated,logout } = useContext(AuthContext)
  const {fav}=useContext(wishContext)
  const {shopList}=useContext(shoplistContext)
  const [showFav, setShowFav] = useState(false);
  const [showProfile, setShowProfile] = useState(false)
  const location = useLocation();
  const checkLogout=()=>{
    logout()
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Recipes", path: "/recipes" },
    { name: "Meal Planner", path: "/mealplan" },
    { name: "Ingredients Shop", path: "/shoplist" },
    { name: "AI Assitant", path: "/assistant" }

  ];

  const isActive = (path) => location.pathname === path;


  return (
    <nav className="sticky top-0 bg-white shadow-md w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-2 flex-wrap">
        <div className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-10"
          />
          <span className="text-xl font-bold  text-blue-600">Home Chef</span>
        </div>
        <button
          className="sm:hidden ml-auto text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden sm:flex items-center space-x-6 mt-4 sm:mt-0">
          <div className="relative">
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {fav.length}
            </span>
            <button onClick={() => setShowFav(true)} className="text-gray-700 flex items-center text-sm">
              <Heart className="w-5 h-5 mr-1" /> WishList
            </button>
          </div>
          <WishList isOpen={showFav} onClose={() => { setShowFav(false) }} />
          <div className="relative">
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
              { shopList.length}
            </span>
            <Link to='/shopcart'>
            <button className="text-gray-700 flex items-center text-sm">
              <ShoppingCart className="w-5 h-5 mr-1" /> Shopping Cart
            </button>
            </Link>
            
          </div>

          <button onClick={() => setShowProfile(true)} className="text-gray-700 flex items-center text-sm">
            <User className="w-5 h-5 mr-1" /> My Account
          </button>
          <Account isOpen={showProfile} onClose={() => setShowProfile(false)} />
        </div>
      </div>
      <div className="w-[90%] h-[1px] justify-self-center bg-gray-200"></div>
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center py-2 text-sm">
        <div className="hidden sm:flex flex-wrap gap-4">
          {navItems.map((item) => (
            <div key={item.path} className="relative flex flex-col items-center">
              <Link
                to={item.path}
                className={`transition font-medium font-mono ${isActive(item.path) ? 'font-extrabold text-blue-600' : 'hover:text-blue-500'}`}
              >
                {item.name}
              </Link>
              {isActive(item.path) && (
                <div className="absolute top-[1.3rem] w-full h-[2px] bg-blue-600 rounded-md" />
              )}
            </div>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-3  mt-2 sm:mt-0">
          <div className="flex items-center mt-3 space-x-1">
            <img
              src="https://flagcdn.com/us.svg"
              alt="US"
              className="w-5 h-3 object-cover"
            />
            <span>English (USA)</span>
          </div>
          <Link to='/'>
            {isAuthenticated ? <button onClick={checkLogout} className="flex font-semibold items-center gap-1 mt-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700">
              <LogIn size={18} /> Logout
            </button> : <button className="flex items-center gap-1 mt-2 font-semibold text-blue-600 border border-blue-600  hover:text-white px-6 py-2 rounded hover:bg-blue-600">
              <LogIn size={18} /> Login
            </button>}</Link>

        </div>
      </div>
    <>
  {menuOpen && (
    <div
      className="fixed inset-0 bg-black/20 z-40"
      onClick={() => setMenuOpen(false)}
    />
  )}
  <div
    className={`fixed top-0 right-0 h-full w-1/2 sm:w-1/4 bg-white z-50 shadow-lg p-4 flex flex-col text-left transform transition-transform duration-500 ease-in-out ${
      menuOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex justify-end mb-2">
      <button
        onClick={() => setMenuOpen(false)}
        className="text-gray-600 hover:text-red-600"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
    <nav className="flex flex-col space-y-4 mt-2 text-gray-700 font-medium">
      <Link onClick={() => setMenuOpen(false)} to="/" className="flex items-center gap-2 hover:text-blue-600">
        <Home className="w-5 h-5" /> Home
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/about" className="flex items-center gap-2 hover:text-blue-600">
        <Info className="w-5 h-5" /> About
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/recipes" className="flex items-center gap-2 hover:text-blue-600">
        <BookOpen className="w-5 h-5" /> Recipes
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/mealplan" className="flex items-center gap-2 hover:text-blue-600">
        <CalendarCheck className="w-5 h-5" /> Meal Planner
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/shopcart" className="flex items-center gap-2 hover:text-blue-600">
        <ShoppingCart className="w-5 h-5" /> Shopping Cart
      </Link>
      <Link onClick={() => setMenuOpen(false)} to="/assistant" className="flex items-center gap-2 hover:text-blue-600">
        <Bot className="w-5 h-5" /> AI Assistant
      </Link>
      <Link to="/">
        {isAuthenticated ? (
          <button
            onClick={checkLogout}
            className="flex w-full items-center font-semibold gap-2 mt-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
          >
            <LogIn className="w-5 h-5" /> Logout
          </button>
        ) : (
          <button
            onClick={() => setMenuOpen(false)}
            className="flex w-full items-center gap-2 mt-2 font-semibold bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            <LogIn className="w-5 h-5" /> Login
          </button>
        )}
      </Link>
    </nav>
  </div>
</>



    </nav>
  );
};

export default Navbar;
