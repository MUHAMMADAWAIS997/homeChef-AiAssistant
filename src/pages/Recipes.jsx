import React, { useState, useEffect, useContext } from 'react';
import RecipeCard from '../components/recipes/RecipeCard';
import { Search,   Clock } from 'lucide-react';
import heroImage from '../assets/bg4.jpeg';
import { toast } from 'react-toastify';
import AuthContext from '../context/Auth context/AuthContext';
import { wishContext } from '../context/wishlist/wishListContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
const Recipes = () => {
  const BASE_API=import.meta.env.VITE_BASE_API
  const navigate =useNavigate()
  const {isAuthenticated,token}=useContext(AuthContext)
  const {recipes, setItems} = useContext(wishContext)
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    mealType: '',
    difficulty: '',
    cookTime: '',
  });
  const {fav,setList,addList}=useContext(wishContext)
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_API}meal/fetchmeals`,{
          method:"GET",
          headers:{
            'auth-token':token,
            'Content-Type':'application/json'
          }
        });
        if (!response.ok) {
        }
        const data = await response.json();
        setItems(data.recipes || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token]);
 useEffect(() => {
     const getWishList = async () => {
       try {
         const response = await fetch(`${BASE_API}wishlist/fetchwishlist`, {
           method: "GET",
           headers: {
             'Content-Type': 'application/json',
             'auth-token': token
           },
         })
         const data = await response.json()
         if (response.ok) {
           setList(data.favorite)
         }
         else {
           toast.error(data.error)
         }
       } catch (err) {
         console.log(err)
       }
     }
     if (token) {
       getWishList()
     }
   }, [token]);

    const addtoFav = async (fname, fmeal) => {
    const data = ({ name: fname, meal: fmeal })
    try {
      const response = await fetch(`${BASE_API}wishlist/addfavorite`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (response.ok) {
        console.log(res.added)
        addList(res.added)
        toast.success("Recipe added to Wishlist")

      }
      else {
        toast.error(res.error)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;
    
    const matchesMealType = !filters.mealType || recipe.tags?.includes(filters.mealType);
    
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
  if(!isAuthenticated){
    return navigate('/')
  }
 

  return (

  <>
  <Navbar/>
      <div className=" bg-cover bg-center h-[40vh] min-h-[200px] relative"        style={{ backgroundImage: `url(${heroImage})` }}
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
      
      <div className="container px-10 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-secondary">
                <span className="font-medium text-red-500">{filteredRecipes.length}</span> recipes found
              </p>
              <div className="mb-6">
                <h4 className="text-sm text-blue-600 font-medium mb-2 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Cook Time
                </h4>
                <select
                  value={filters.cookTime}
                  onChange={(e) => handleFilterChange('cookTime', e.target.value)}
                  className="input text-sm py-2 border border-blue-300 rounded focus:outline-none"
                >
                  <option value="">Any Time</option>
                  <option value="under30">Under 30 minutes</option>
                  <option value="30to60">30-60 minutes</option>
                  <option value="over60">Over 60 minutes</option>
                </select>
              </div>
              <div className="mb-6">
                <h4 className="text-sm text-blue-500 font-medium mb-2">Difficulty</h4>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="input text-sm py-2 border border-blue-300 rounded focus:outline-none"
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe._id}  isFav={fav.some(f => f.meal === recipe._id)}
  addtoFav={addtoFav} recipe={recipe} />
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
          </div>
        </div>
      </div>
      <Footer/>
    </>)
 
};

export default Recipes;