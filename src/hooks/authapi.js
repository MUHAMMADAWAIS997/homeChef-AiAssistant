const BASE_API=import.meta.env.VITE_BASE_API
export const getUser=async (token)=>{
        try{
        const response=await fetch(`${BASE_API}auth/getUser`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'auth-token':token
            },
        })
        const data=await response.json()
        return data
        }catch(err)
        {
            return err
        }
    }
   export const verifyUser=async(data)=>{
    try{
        const response=await fetch(`${BASE_API}auth/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                
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
   export const createUser=async(data)=>{
    try{
        const response=await fetch(`${BASE_API}auth/createUser`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                
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