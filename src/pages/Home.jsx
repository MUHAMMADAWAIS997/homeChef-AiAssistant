import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ShoppingCart, Sparkles, MessageSquare } from 'lucide-react';
import homeBg from '../assets/bg2.jpeg'
const Home = () => {
  
  return (
    <div className={`bg-white  text-gray-600 transition-colors duration-300`}>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[80vh] flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Your Personal <span className="text-blue-500">Cooking Assistant</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-150">
            Discover recipes based on what you already have, plan your meals, and get step-by-step cooking guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link
              to="/assistant"
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try AI Assitant
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md text-lg font-medium hover:bg-white hover:text-blue-800 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">How HomeChef Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 shadow-2xl  hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-600/10 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Find Recipes</h3>
            <p className="text-gray-600 ">Enter the ingredients you have, and we'll suggest recipes you can make right now.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6  shadow-2xl hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-600/10 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Plan Your Meals</h3>
            <p className="text-gray-600 ">Create daily, weekly, or monthly meal plans to simplify your cooking routine.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6  shadow-2xl hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-600/10 p-4 rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Shopping Lists</h3>
            <p className="text-gray-600 ">Automatically generate shopping lists based on your meal plans and missing ingredients.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 shadow-2xl  hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-600/10 p-4 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Chef Assistant</h3>
            <p className="text-gray-600 ">Get real-time cooking guidance and answers to your culinary questions.</p>
          </div>
        </div>
      </section>
      
      {/* Ai Section */}
      
      <section className="bg-gray-50 text-black  py-15 pl-15">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Ask Our AI Assistant</h2>
              <p className="text-text-secondary mb-6">
                Need help with a recipe? Not sure what to cook with the ingredients you have?
                Our AI assistant can provide cooking tips, suggest recipes, and answer your culinary questions.
              </p>
              
              <div className="bg-white  p-4 rounded-lg shadow mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">I have chicken, bell peppers, and rice. What can I make?</p>
                    <p className="text-xs text-text-secondary">User</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">You could make a delicious chicken stir-fry with bell peppers over rice! I'll walk you through a simple recipe that takes about 30 minutes...</p>
                    <p className="text-xs  text-text-secondary">AI Assistant</p>
                  </div>
                </div>
              </div>
              
              <Link to="/assistant" className="btn bg-blue-600 text-xl font-bold p-1 text-white rounded btn-primary">
                Try AI Assistant
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6210933/pexels-photo-6210933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Chef cooking with smartphone assistance" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Cooking Experience?</h2>
          <p className="text-xl text-white mb-8">Join thousands of home cooks who have simplified their meal planning and discovered new favorite recipes.</p>
          <Link
            to="/signup"
            className="px-8 py-4 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login to Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;