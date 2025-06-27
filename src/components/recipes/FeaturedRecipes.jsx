import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes?limit=6');
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
    <section className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Featured Recipes</h2>
          <p className="text-text-secondary mt-1">Discover our most popular recipes</p>
        </div>
        <a href="/recipes" className="btn btn-outline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;