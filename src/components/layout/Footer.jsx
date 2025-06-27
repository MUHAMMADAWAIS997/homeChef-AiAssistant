import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat,Facebook,Twitter,Mail,Instagram } from 'lucide-react';
export default function Footer() {
  return (
    <footer className={` bg-gray-100 text-gray-800 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmFDMlY-EFSEeDDXJGDw_9Z_AyVBJQrrKQ&s"
            alt="logo"
            className="h-15 justify-self-center"
          />
              <span className="ml-2 text-xl font-bold">HomeChef</span>
            </Link>
            <p className="mt-4 text-sm">Your personal cooking assistant helping you create delicious meals with the ingredients you have on hand.</p>
            <div className="mt-6 flex space-x-4">
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
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recipes" className="hover:text-blue-600 transition-colors">Recipe Finder</Link></li>
              <li><Link to="/mealplanner" className="hover:text-blue-600 transition-colors">Meal Planner</Link></li>
              <li><Link to="/shoplist" className="hover:text-blue-600 transition-colors">Shopping List</Link></li>
              <li><Link to="/assistant" className="hover:text-blue-600 transition-colors">Chef Assistant</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Get our latest recipes and cooking tips directly to your inbox!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300 "
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} HomeChef. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
