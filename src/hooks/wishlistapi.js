const BASE_API=import.meta.env.VITE_BASE_API
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