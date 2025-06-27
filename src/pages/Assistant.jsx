import React from 'react';
import { BookOpen, Sparkles, Coffee, MessageSquare, Star } from 'lucide-react';
import ChatInterface from '../components/assistant/ChatInterface';
import bg from '../assets/bg4.jpeg'
export default function Assistant () {
  return (
    <div>
      <div className="bg-white pb-12">
        <div className="container">
          <div className="text-center mb-12 bg-cover" style={{backgroundImage:`url(${bg})`}}>
            <h1 className="text-3xl font-bold mb-4">AI Cooking Assistant</h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your personal cooking companion powered by ChatGPT. Ask for recipes, cooking tips,
              meal planning advice, and more.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <ChatInterface />
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg shadow-md  overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold text-blue-600">Example Questions</h2>
                </div>
                
                <div className="p-4">
                  <ul className="space-y-4">
                    <li>
                      <button className="w-full text-left p-3 rounded-lg  bg-white shadow-lg hover:shadow-xl transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Recipe ideas</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          "What can I make with chicken, spinach, and feta cheese?"
                        </p>
                      </button>
                    </li>
                    
                    <li>
                      <button className="w-full text-left p-3 rounded-lg  hover:bg-white shadow-lg hover:shadow-xl transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Cooking techniques</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          "How do I properly sear a steak to medium-rare?"
                        </p>
                      </button>
                    </li>
                    
                    <li>
                      <button className="w-full text-left p-3 rounded-lg  hover:bg-white shadow-lg hover:shadow-xl transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Coffee className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Substitutions</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          "What can I use instead of eggs in a cake recipe?"
                        </p>
                      </button>
                    </li>
                    
                    <li>
                      <button className="w-full text-left p-3 rounded-lg  hover:bg-white shadow-lg hover:shadow-xl transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Meal planning</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          "Help me create a healthy meal plan for the week."
                        </p>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-surface rounded-lg shadow-md  mt-6 p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pro Tip</h3>
                    <p className="text-sm text-text-secondary">
                      For the best results, try to be specific about what you're looking for. Mention any dietary restrictions, cooking equipment you have, or time constraints.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
