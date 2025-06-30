// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import {
  Heart,ShoppingCart,User,Menu,X,LogIn
} from 'lucide-react';
import Account from '../profile/Account';
import WishList from '../wish-cart/Wishlist';

const Navbar = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [showFav, setShowFav] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showProfile,setShowProfile]=useState(false)
    
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Recipes", path: "/recipes" },
    { name: "Meal Planner" , path:"/mealplan"},
    { name: "Shopping List" , path:"/shoplist"},
    { name: "AI Assitant" , path:"/assistant"}

  ];

  const isActive = (path) => location.pathname === path;
 

  return (
    <nav className="bg-white shadow-md w-full z-50">
      {/* Top Navbar */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-10"
          />
          <span className="text-xl font-bold text-blue-600">Home Chef</span>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="sm:hidden ml-auto text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        

        {/* Icons */}
        <div className="hidden sm:flex items-center space-x-6 mt-4 sm:mt-0">
          <div className="relative">
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
              6
            </span>
            <button onClick={()=>setShowFav(true)} className="text-gray-700 flex items-center text-sm">
              <Heart className="w-5 h-5 mr-1" /> WishList
            </button>
          </div>
          <WishList isOpen={showFav} onClose={()=>{setShowFav(false)}}/>
          <div className="relative">
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
              2
            </span>
            <button className="text-gray-700 flex items-center text-sm">
              <ShoppingCart className="w-5 h-5 mr-1" /> Shopping List
            </button>
          </div>

          <button onClick={()=>setShowProfile(true)} className="text-gray-700 flex items-center text-sm">
            <User className="w-5 h-5 mr-1" /> My Account
          </button>
          <Account isOpen={showProfile} onClose={()=>setShowProfile(false)} />
        </div>
      </div>

      {/* Divider */}
      <div className="w-[80%] h-[1px] justify-self-center bg-gray-200"></div>

      {/* Bottom Navbar */}
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center px-4 py-2 text-sm">
        {/* Nav Links */}
        <div className="hidden sm:flex flex-wrap gap-4">
          {navItems.map((item) => (
              <div key={item.path} className="relative flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`transition font-medium ${isActive(item.path) ? 'font-bold text-blue-600' : 'hover:text-blue-500'}`}
                >
                  {item.name}
                </Link>
                {/* Bottom border underline */}
                {isActive(item.path) && (
                  <div className="absolute top-[1.3rem] w-full h-[2px] bg-blue-600 rounded-md" />
                )}
              </div>
            ))}
        </div>

        {/* Location and Language */}
        <div className="hidden sm:flex items-center gap-3 mt-2 sm:mt-0">
            <div className="flex items-center space-x-1">
            <img
              src="https://flagcdn.com/us.svg"
              alt="US"
              className="w-5 h-3 object-cover"
            />
            <span>English (USA)</span>
          </div>
          <Link to='/login'>
          {isAuthenticated?<button  onClick={checkLogout} className="flex items-center gap-1 mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                <LogIn size={18} /> Logout
              </button>: <button className="flex items-center gap-1 mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                <LogIn size={18} /> Login
              </button>}</Link>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-4">
          <div className="flex flex-col gap-2">
           
            <div className="flex flex-col gap-2">
              <button className="text-gray-700 flex items-center text-sm">
                <Heart className="w-5 h-5 mr-1" /> WishList
              </button>
              <button className="text-gray-700 flex items-center text-sm">
                <User className="w-5 h-5 mr-1" /> My Account
              </button>
            </div>
          </div>

          <div className="container py-4 flex flex-col gap-4 text-left">
            <Link   onClick={() => setMenuOpen(!menuOpen)}  to="/" className=" hover:text-blue-600">Home</Link>
            <Link   onClick={() => setMenuOpen(!menuOpen)} to="/about" className="hover:text-blue-600">About</Link>
            <Link   onClick={() => setMenuOpen(!menuOpen)} to="/recipes" className="hover:text-blue-600">Recipes</Link>
            <Link   onClick={() => setMenuOpen(!menuOpen)} to="/mealplan" className="hover:text-blue-600">Meal Planner</Link>
            <Link   onClick={() => setMenuOpen(!menuOpen)} to="/shoplist" className="hover:text-blue-600">Shopping List</Link>
            <Link   onClick={() => setMenuOpen(!menuOpen)} to="/assistant" className="hover:text-blue-600">AI Assistant</Link>

           
            <div className="flex items-center space-x-1">
            <img
              src="https://flagcdn.com/us.svg"
              alt="US"
              className="w-5 h-3 object-cover"
            />
            <span>English (USA)</span>
            <Link to='/login'>
            {isAuthenticated?<button  onClick={checkLogout} className="flex ml-40 items-center gap-1 mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                <LogIn size={18} /> Logout
              </button>: <button className="flex items-center gap-1 mt-2 ml-40 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                <LogIn size={18} /> Login
              </button>}</Link>
          </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
