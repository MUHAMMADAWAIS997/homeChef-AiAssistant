import React, { useState } from "react";
import {ChefHat, Moon, Sun } from 'lucide-react';


export default function NavBar(props) {
    
    return (
        <>
        <nav className={`flex  ${props.darkMode ? 'bg-gray-900 text-white' : 'bg-sky-400 text-white'}  justify-between items-center border-2 border-amber-50 text-white px-4`}>
            <ChefHat className="h-10 w-10"/>
            <p className=" font-roboto text-2xl pt-2 font-bold">Home Chef</p>
            <ul className="flex ml-auto py-3 space-x-5 items-center">
                <li className="cursor-pointer underline hover:text-amber-300 hover:bg-sky-500">Home</li>
                <li className="cursor-pointer underline hover:text-amber-300 hover:bg-sky-500">Contact Us</li>
                <li className="cursor-pointer underline hover:text-amber-300 hover:bg-sky-500">Chef Assistant</li>
                <li className="cursor-pointer underline hover:text-amber-300 hover:bg-sky-500">Help</li>
                <li className="cursor-pointer underline hover:text-amber-300 hover:bg-sky-500">Recipe Finder</li>
                <button className={` ${props.darkMode? 'bg-white text-gray-900 hover:bg-gray-950 hover:text-white':'bg-white text-sky-400 hover:bg-sky-500 hover:text-white'}  text-xl border-[#E8F0FE] font-bold  border-2 rounded px-3 py-1`}>
                    Login
                </button>
                <button onClick={props.toggleMode} className="pr-3 text-white">
                    {props.darkMode ? <Moon /> : <Sun />}
                </button>
            </ul>
        </nav>
        
        </>
        
        
    );
    
}