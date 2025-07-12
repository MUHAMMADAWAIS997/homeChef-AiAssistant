import React,{useState} from 'react';
import { shoplistContext } from './ShoplistContext';
export default function ShoplistState(props) {
    const [shopList, setShopList] = useState([]);
    const setShoplist=(data)=>{
        setShopList(data)
    }
    const addShopitem=(data)=>{
        setShopList((prev)=>[...prev,data])
    }
  return (
    <shoplistContext.Provider value={{shopList,setShoplist,addShopitem}}>
        {props.children}
    </shoplistContext.Provider>
  );
}
