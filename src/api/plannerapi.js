import axios from "./axiosInstance";

export const addPlan = async (plan) => {
  try {
    const { data } = await axios.post("mealplan/addmeal", plan);
    return data
  } catch (err) {
    console.log( "something went wrong", err)
  }
};

export const getPlan=async()=>{
    try{
        const {data}= await axios.get('mealplan/getmeal')
    return data
    }catch(err){
    console.log( "something went wrong", err)
    }
    
}
export const updatePlan=async(id,updated)=>{
    try{
        const {data}=await axios.put(`mealplan/updatemeal/${id}`,updated)
        return data
    }catch(err){
        console.log(err)
    }
}
export const deletePlan=async(id)=>{
    try{
        const {data}=await axios.delete(`mealplan/deletemeal/${id}`)
        return data
    }catch(err){
        console.log(err)
    }
}
