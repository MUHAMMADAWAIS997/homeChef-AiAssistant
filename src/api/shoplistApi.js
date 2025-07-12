import axios from "./axiosInstance";

export const addShoplist = async (Item) => {
  try {
    const { data } = await axios.post("shoplist/additem", Item);
    return {success:true,data}
  } catch (err) {
      const message=  err.response?.data?.error ||
        err.response?.data?.message ||
      "Something went wrong";
      return {success:false,error:message}
  }
};

export const getShoplist=async()=>{
    try{
        const {data}= await axios.get('shoplist/fetchshoplist')
    return data
    }catch(err){
    console.log( "something went wrong", err)
    }
    
}
export const updateShoplist=async(id,updated)=>{
    try{
        const {data}=await axios.put(`shoplist/updateitem/${id}`,updated)
        return data
    }catch(err){
        console.log(err)
    }
}
export const deleteShoplist=async(id)=>{
    try{
        const {data}=await axios.delete(`shoplist/deleteitem/${id}`)
        return data
    }catch(err){
        console.log(err)
    }
}
