import React, { useContext } from 'react';
import { X, Heart,Trash2 } from 'lucide-react';
import AuthContext from '../../context/Auth context/AuthContext';
import { wishContext } from '../../context/wishlist/wishListContext';
import { toast } from 'react-toastify';
export default function WishList({ isOpen, onClose }) {
  const BASE_API=import.meta.env.VITE_BASE_API
  const { isAuthenticated ,token} = useContext(AuthContext);
  const { fav, setList, getRecipeImage } = useContext(wishContext)
  const handleDelete=async(id)=>{
     try{
        const response=await fetch(`${BASE_API}wishlist/deletefavorite/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'auth-token':token
            }
        })
        const data=await response.json()
        if(response.ok){
           setList(prev => prev.filter(item => item._id !== id));
          toast.success("Removed from Wishlist")
        }
        else{
          toast.error(data.error)
        }
      }catch(err)
      {
        console.log(err)
      }
  }
  if (!isOpen) return null;

  return (
      <div className="sm:absolute relative top-10 right-3 z-20 bg-gray-50 w-full sm:w-md sm:rounded-lg sm:shadow-2xl px-6 py-6  overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="sm:absolute sm:block hidden top-3 right-3 hover:text-red-500 transition"
        >
          <X />
        </button>

        {isAuthenticated ? (
          <div>
            <h1 className="text-red-600 text-xl text-center font-bold">WishList</h1>
            <div className="flex justify-center mb-4">
              <Heart size={40} fill="red" className="text-red-500" />
            </div>
            <div className="mt-6 p-2">
              <div className="grid grid-cols-[15%_25%_45%_15%] md:grid-cols-[10%_30%_50%_10%] text-sm font-semibold text-gray-700 border-b pb-2">

                <div>#</div>
                <div className="text-center">Image</div>
                <div className="text-center">Recipe</div>
                <div className="text-right">Action</div>
              </div>

              {fav.length > 0 ? (
                fav.map((item, index) => (
                  <div
  key={index}
  className="grid grid-cols-[15%_25%_45%_15%] md:grid-cols-[10%_30%_50%_10%] items-center text-gray-800 py-2 border-b gap-2"
>

                    <div >{index + 1}</div>

                    <div className="flex  justify-center">
                      <img
                        src={getRecipeImage(item.meal)}
                        alt={item.name}
                        className="w-15 h-12 object-cover "
                      />
                    </div>

                    <div className="text-center  truncate">{item.name}</div>

                    <div className="text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No recipes in wishlist</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm mt-4">
            🔒 Login to view WishList
          </p>
        )}
      </div>

  );
}
