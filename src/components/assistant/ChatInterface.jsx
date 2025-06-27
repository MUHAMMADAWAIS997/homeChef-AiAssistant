import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Mic, ImagePlus, ChefHat } from 'lucide-react';
import logo from '../../assets/logo.jpg'
export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your HomeChef AI assistant. I can help you find recipes, suggest meal ideas based on ingredients you have, provide cooking tips, and more. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      let response;
      
      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes('recipe') || input.toLowerCase().includes('make')) {
        response = "I'd be happy to help you find a recipe! What ingredients do you have on hand, or is there a specific type of dish you'd like to make?";
      } else if (input.toLowerCase().includes('ingredient') || input.toLowerCase().includes('have')) {
        response = "Great! Based on those ingredients, I'd recommend a simple pasta dish. Would you like me to suggest a specific recipe?";
      } else if (input.toLowerCase().includes('plan') || input.toLowerCase().includes('meal')) {
        response = "I can help you create a meal plan! Would you prefer a daily, weekly, or monthly plan? And do you have any dietary restrictions I should know about?";
      } else {
        response = "I'm here to help with all your cooking needs. You can ask me for recipes, meal planning assistance, cooking techniques, or ingredient substitutions!";
      }
      
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white  rounded-xl mx-5 shadow-2xl  h-[600px] max-h-[80vh] flex flex-col">
      <div className="border-b border-gray-200 p-4 justify-self-center">
        <div className="flex items-center gap-2 ">
          <img src={logo} alt="" className='h-15 w-15' />
          <h2 className="font-semibold text-2xl text-blue-600">HomeChef Assistant</h2>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100  rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-text-secondary'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100  p-3 rounded-lg rounded-tl-none">
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-sm text-text-secondary">Thinking...</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about recipes, ingredients, or cooking tips..."
            className="flex-grow input p-3 text-xl bg-blue-600/10 rounded-l-md focus:outline-none "
          />
          
          <button 
            type="submit" 
            className="flex p-3 rounded-r-md  bg-blue-800 text-xl text-white hover:bg-primary-light disabled:opacity-60"
            disabled={isLoading || !input.trim()}
          >
           Send <Send fill='white' className="h-7 w-7" />
          </button>
        </form>
        <p className="text-xs text-blue-900 mt-2 text-center">
          AI assistant powered by ChatGPT
        </p>
      </div>
    </div>
  );
};
