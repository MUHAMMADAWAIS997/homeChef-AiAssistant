import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function CartItem( props ) {
  const {name,category,description,image}=props
  const [quantity, setQuantity] = useState(0);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToList = () => {
    console.log(`Added ${quantity} "${title}" to the list`);
  };

  return (
    <div className="bg-white shadow-xl border-gray-200 items-center w-full max-w-60 mx-auto flex flex-col hover:shadow-2xl hover:scale-105 rounded-xl transform space-y-2">
      {/* Image */}
      <div className="w-full h-30  overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full  object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg flex font-bold w-full px-2 text-left  text-yellow-300">{name}</h3>
      <h3 className="text-md flex w-full text-left text-gray-700 "> <p className='px-2'>{description.slice(0,50) }...</p></h3>

      {/* Quantity Controls */}
      <div className="flex border w-40 rounded-2xl border-blue-500 items-center space-x-12">
        <button
          onClick={decreaseQty}
          className="bg-blue-500 text-white justify-self-center rounded-full p-2 hover:bg-blue-600 transition"
        >
          <Minus size={11} />
        </button>
        <span className="text-md font-semibold">{quantity}</span>
        <button
          onClick={increaseQty}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
        >
          <Plus size={11} />
        </button>
      </div>

      {/* Add to List Button */}
      <button
        onClick={handleAddToList}
        className="mb-2 bg-blue-500 text-white w-40 px-4  rounded-2xl hover:bg-blue-600 transition"
      >
        Add to List
      </button>
    </div>
  );
}
