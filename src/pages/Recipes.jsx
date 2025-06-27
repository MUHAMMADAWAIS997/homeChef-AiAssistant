import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/recipes/RecipeCard';
import { Search, Filter, ChevronsUpDown, Clock, Flame } from 'lucide-react';
import heroImage from '../assets/bg4.jpeg'
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    mealType: '',
    difficulty: '',
    cookTime: '',
  });
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  // Apply filters and search
  const filteredRecipes = recipes.filter(recipe => {
    // Search query filter
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Difficulty filter
    const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;
    
    // Meal type filter (simplified for demo)
    const matchesMealType = !filters.mealType || recipe.tags?.includes(filters.mealType);
    
    // Cook time filter
    let matchesCookTime = true;
    if (filters.cookTime === 'under30') {
      matchesCookTime = (recipe.cookTimeMinutes + recipe.prepTimeMinutes) <= 30;
    } else if (filters.cookTime === '30to60') {
      const totalTime = recipe.cookTimeMinutes + recipe.prepTimeMinutes;
      matchesCookTime = totalTime > 30 && totalTime <= 60;
    } else if (filters.cookTime === 'over60') {
      matchesCookTime = (recipe.cookTimeMinutes + recipe.prepTimeMinutes) > 60;
    }
    
    return matchesSearch && matchesDifficulty && matchesMealType && matchesCookTime;
  });

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[url('https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center h-[40vh] min-h-[300px] relative"        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container relative h-full flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4">Explore Recipes</h1>
          <p className="text-white/90 text-lg mb-8 text-center max-w-2xl">
            Discover thousands of recipes for any occasion, cuisine, or diet.
          </p>
          
          <div className="w-full max-w-2xl bg-white/95 dark:bg-surface/95 p-3 rounded-lg shadow-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes or ingredients..."
                className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container  py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-gray-100  shadow-md p-4 pb-50 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                <button className="text-sm text-primary hover:underline">
                  Reset
                </button>
              </div>
              
              {/* Meal Type Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Meal Type</h4>
                <select
                  value={filters.mealType}
                  onChange={(e) => handleFilterChange('mealType', e.target.value)}
                  className="input text-sm py-2"
                >
                  <option value="">All Meal Types</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              {/* Difficulty Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="input text-sm py-2"
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              {/* Cook Time Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Cook Time
                </h4>
                <select
                  value={filters.cookTime}
                  onChange={(e) => handleFilterChange('cookTime', e.target.value)}
                  className="input text-sm py-2"
                >
                  <option value="">Any Time</option>
                  <option value="under30">Under 30 minutes</option>
                  <option value="30to60">30-60 minutes</option>
                  <option value="over60">Over 60 minutes</option>
                </select>
              </div>
              
              {/* More filters can be added here */}
            </div>
          </div>
          
          {/* Recipe grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">{filteredRecipes.length}</span> recipes found
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select className="input text-sm py-1 pr-8">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Prep Time</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary mb-4">No recipes found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      mealType: '',
                      difficulty: '',
                      cookTime: '',
                    });
                  }}
                  className="btn btn-outline"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {filteredRecipes.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="btn btn-outline bg-blue-600 text-xl font-bold text-white rounded p-2 hover:bg-blue-700">
                  Load More Recipes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Recipes;