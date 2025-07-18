import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, BookOpen, ShoppingCart,
  Bot,Facebook,Twitter,Mail,Instagram, 
  Heart,
  } from 'lucide-react';
import { toast } from 'react-toastify';
export default function Footer() {
  const handleSubmit=(e)=>{
    e.preventDefault();
    toast.info("Thank you for comment")
  }
  return (
    <>
   
    <footer className={` bg-white text-gray-800 border hidden sm:block border-t-gray-200 transition-colors duration-300`}>
      <div className="w-full mx-auto px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-15 justify-self-center"
              />
              <span className="ml-2 text-xl font-bold">HomeChef</span>
            </Link>
            <p className="mt-4 text-sm">Your personal cooking assistant helping you create delicious meals.</p>
            <div className="mt-3 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>


          <div className="col-span-1 mt-10 ml-40">
            <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
            <form className="flex " onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your comment"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300 "
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200  mt-8 p-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} HomeChef. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t sm:hidden shadow-md">
  <div className="flex justify-around items-center py-2 text-xs ">
    <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
      <Home className="w-5 h-5 mb-1" /> Home
    </Link>
    <Link to="/about" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
      <Info className="w-5 h-5 mb-1" /> About
    </Link>
    <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
      <Heart className="w-5 h-5 mb-1" /> WishList
    </Link>
    <Link to="/shoplist" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
      <ShoppingCart className="w-5 h-5 mb-1" /> Shop
    </Link>
    <Link to="/assistant" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
      <Bot className="w-5 h-5 mb-1" />AI Assistant
    </Link>
  </div>
</div>
     </>
  );
}
