import { useState } from "react"
import { wishContext } from "./wishListContext"

export default function WishState(props){
    const [fav,setFav]=useState([])
    const addtoFav=(data)=>{
        setFav(fav.concat(data))
    }
    return(
        <wishContext.Provider value={{fav,addtoFav}}>
            {props.children};
        </wishContext.Provider>
    )
}