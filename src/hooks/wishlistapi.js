const BASE_API=import.meta.env.VITE_BASE_API
export const getWishList=async (token)=>{
        try{
        const response=await fetch(`${BASE_API}wishlist/fetchwishlist`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'auth-token':token
            },
        })
        data=await response.json()
        return data
        }catch(err)
        {
            return err
        }
    }
   export const addWishList=async(data,token)=>{
    try{
        const response=await fetch(`${BASE_API}wishlist//addfavorite`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'auth-token':token
            },
            body:JSON.stringify(data)
        })
        data=await response.json()
        return data
        }catch(err)
        {
            return err
        }
   }
   export const deleteWishList=async(id,token)=>{
    try{
        const response=await fetch(`${BASE_API}wishlist//deletefavorite/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'auth-token':token
            }
        })
        data=await response.json()
        return data
        }catch(err)
        {
            return err
        }
   }