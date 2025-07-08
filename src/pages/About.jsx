import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Github } from 'lucide-react';
import heroImage from '../assets/bg5.jpg'; 
import person1 from '../assets/logo.jpg'; 
import person2 from '../assets/logo.jpg';
import foodbg from '../assets/bg2.jpeg';
export default function About () {
  return (
    <div className="bg-white text-gray-800">
      <section
        className="bg-cover bg-center py-20 text-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow">About HomeChef</h1>
        <p className="text-xl font-medium max-w-2xl mx-auto drop-shadow">
          Your smart companion for planning meals, finding recipes, AI cooking help, and managing your grocery list efficiently.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-600">What is HomeChef?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            HomeChef is your intelligent kitchen partner. From curating meal plans tailored to your needs to providing step-by-step AI assistance while you cook, HomeChef revolutionizes how you manage time and eat smart. Discover recipes, optimize groceries, and let technology enhance your daily cooking.
          </p>
        </div>
        <img src="https://t4.ftcdn.net/jpg/03/57/91/11/360_F_357911175_lUNZj0iZx0B6UEj3JyJwhKnJQv1jT1i4.jpg" alt="HomeChef concept" className="rounded-xl shadow-md" />
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl  mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-600 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 shadow-md rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">🍱 Meal Planner</h3>
              <p className="text-gray-600">Create daily, weekly, or monthly plans with nutrition-focused suggestions and AI assistance.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">🔍 Recipes Finder</h3>
              <p className="text-gray-600">Input available ingredients and get instant recipe ideas with steps and alternatives.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">🤖 AI Assistant</h3>
              <p className="text-gray-600">Ask any cooking query or technique and get guidance instantly while cooking.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">🛒 Shopping List</h3>
              <p className="text-gray-600">Generate smart grocery lists based on your meal plan or chosen recipes with export/share options.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 "style={{ backgroundImage: `url(${foodbg})` }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-blue-600 text-center">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl shadow">
              <img src={person1} alt="Ayesha M" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-lg italic text-gray-700">“HomeChef helped me manage my family’s meals and grocery lists like never before!”</p>
                <footer className="mt-2 text-sm text-gray-500">— Ayesha M., Lahore</footer>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl shadow">
              <img src={person2} alt="Kamran S" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-lg italic text-gray-700">“The AI assistant is a game-changer in the kitchen. I no longer feel lost while cooking.”</p>
                <footer className="mt-2 text-sm text-gray-500">— Kamran S., Islamabad</footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Contact Us</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-center items-center gap-2">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@homechef.ai" className="text-blue-600 underline">support@homechef.ai</a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>123 Culinary Street, FoodTech City, Pakistan</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-blue-600">
            <a href="#"><Instagram className="w-6 h-6" /></a>
            <a href="#"><Facebook className="w-6 h-6" /></a>
            <a href="#"><Github className="w-6 h-6" /></a>
          </div>
        </div>
      </section>
    </div>
  );
};

