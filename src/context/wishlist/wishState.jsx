import { useState } from "react"
import { wishContext } from "./wishListContext"

export default function WishState(props){
    const [fav,setFav]=useState([])
    const [recipes,setRecipes]=useState([])
    const setItems=(data)=>{
        setRecipes(data)
    }
    const getRecipeImage=(id)=>{
        const recipe=recipes.find(r=>r._id===id)
        return recipe?.image||'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    const setList=(data)=>{
        setFav(data)
    }
    const addList=(data)=>{
        setFav((prevFav) => [...prevFav, data]);
    }
    return(
        <wishContext.Provider value={{fav,setList,addList,recipes,setItems,getRecipeImage}}>
            {props.children};
        </wishContext.Provider>
    )
}