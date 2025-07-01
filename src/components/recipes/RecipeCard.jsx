import { Clock, Heart } from 'lucide-react';
import { useContext, } from 'react';
import { wishContext } from '../../context/wishlist/wishListContext';

const RecipeCard = ({ recipe }) => {
  const { _id, name, image, cookTimeMinutes, prepTimeMinutes, difficulty, rating } = recipe;
  const {fav,addtoFav}=useContext(wishContext)
  const totalTime = cookTimeMinutes + prepTimeMinutes;
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-accent">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-accent">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="card group shadow-lg hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img 
          src={image || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600'} 
          alt={name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80  rounded-full text-white transition-colors"
         onClick={addtoFav({name:name,meal:_id})}
        >
          <Heart className={`h-5 w-5 text-text-secondary ${fav? ' bg-red-500':'bg-white'} `} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-3">
          <div className="flex items-center gap-1 text-yellow-300 text-sm mb-1">
            {renderStars(rating)}
            <span className="ml-1 text-white">({rating})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-xs font-medium px-2 py-1 bg-primary/80 rounded-full">
              {difficulty}
            </span>
            <div className="flex items-center gap-1 text-white text-sm">
              <Clock className="h-4 w-4" />
              <span>{totalTime} min</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        
          <h3 className="font-medium text-blue-500 text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        <p className="text-text-secondary text-gray-600 text-sm line-clamp-2">
          {recipe.description || 'Delicious recipe made with fresh ingredients. Perfect for any occasion.'}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;