import React, { useState, useEffect } from 'react';
import CartItem from '../components/wish-cart/Cartitem';
import { Search, Filter,ShoppingCart } from 'lucide-react';
import shopBg from '../assets/bg3.jpg'
export default function ShoppingList() {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true); 

  const categories = [
    'common', 'vegetable', 'bread', 'liquid', 'seafood', 'rice',
    'preserve', 'sugar', 'juice', 'fat', 'cheese', 'grain', 'fruit', 'wine'
  ];

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/ingredient/fetchingredients',{
          method:"GET",
          headers:{
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MGRkMzNjZGIzNGMzNjQ1YWQyZDgyIn0sImlhdCI6MTc1MTE3OTY2OX0.LCMuC22mcqBZCR7F4uwsvFeztF-FHj5gx0ddGuCWhfI"
          }
        });
        const data = await res.json();

        

        setIngredients(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const groupedByCategory = filteredIngredients.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const Loader = () => (
   <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
  );

  return (
    <>
      <div className=" bg-cover bg-center min-h-[150px] relative" style={{backgroundImage:`url(${shopBg})`}}>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container relative h-full flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-2">Explore Ingredients</h1>

          <div className="w-full max-w-2xl bg-white/95 p-3 rounded-lg shadow-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ingredient or category..."
                className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='p-2 grid grid-cols-2 border-b-gray-200 border'>
        <span className='text-red-500 text-lg font-semibold hover:underline'>Total ingredients: {ingredients.length}</span>
        <button className=' bg-blue-500 hover:bg-blue-700 text-lg p-2 text-white flex justify-self-end text-center font-semibold w-1/3 rounded'><ShoppingCart  className='mx-2 self-center '/> View Shopping List</button>
      </div>
      
      <div className="flex">
        <div className="w-30 sm:w-64 bg-gray-100 h-full sticky top-0 p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => setSelectedCategory('')}
            >
              Reset
            </button>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Categories:</h4>
            <form className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              <label className="flex items-center gap-2 px-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="accent-blue-500"
                />
                <span>All</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 px-2 cursor-pointer capitalize">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </form>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto h-[calc(150vh-40vh)] p-6 space-y-8">
          {loading ? (
            <Loader />
          ) : (
            <>
              {Object.entries(groupedByCategory).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold mb-8 text-red-600 capitalize underline">{category}:</h2>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item, idx) => (
                      <CartItem
                        key={`${category}-${idx}`}
                        name={item.name}
                        description={item.description}
                        category={item.category}
                        image={item.image}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {filteredIngredients.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                  No ingredients or categories found 
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
