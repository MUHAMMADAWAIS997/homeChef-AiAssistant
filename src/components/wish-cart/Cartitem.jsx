import React, { useContext, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { shoplistContext } from '../../context/shoplist/ShoplistContext';
import { addShoplist } from '../../api/shoplistApi';
import { toast } from 'react-toastify';
export default function CartItem( props ) {
  const {_id,name,category,description,image}=props
  const [quantity, setQuantity] = useState(1);
  const {addShopitem}=useContext(shoplistContext)
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToList = async (limage,lname,id,lcategory,lquantity) => {
    const newItem = {
      image:limage,
      title:lname,
      ingredient:id,
      category:lcategory,
      quantity:lquantity
    };
    const res=await addShoplist(newItem)
    if(res.success){
     addShopitem(res.data)
     toast.success("Item added to cart")

    }
    else{
      toast.warn(res.error)
    }
  };

  return (
    <div className="bg-white shadow-xl border-gray-200 items-center w-full max-w-60 mx-auto flex flex-col hover:shadow-2xl hover:scale-105 rounded-xl transform space-y-2">
      <div className="w-full h-30  overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full  object-cover"
        />
      </div>
      <h3 className="text-lg flex font-bold w-full px-2 text-left  text-orange-500">{name}</h3>
      <h3 className="text-md flex w-full text-left text-gray-700 "> <p className='px-2'>{description.slice(0,50) }...</p></h3>

      <div className="flex border w-40 rounded-2xl border-blue-500 items-center space-x-10">
        <button
          onClick={decreaseQty}
          className="bg-blue-500 text-white justify-self-center rounded-l-full py-2 px-3 hover:bg-blue-600 transition"
        >
          <Minus size={11} />
        </button>
        <span className="text-md font-semibold w-2">{quantity}</span>
        <button
          onClick={increaseQty}
          className="bg-blue-500 text-white rounded-r-full py-2 px-3 hover:bg-blue-600 transition"
        >
          <Plus size={11} />
        </button>
      </div>
      <button
        onClick={()=>handleAddToList(image,name,_id,category,quantity)}
        className="mb-2 bg-orange-600 text-white w-40 px-4 py-1 rounded-2xl hover:bg-orange-700 transition"
      >
        Add to cart
      </button>
    </div>
  );
}
