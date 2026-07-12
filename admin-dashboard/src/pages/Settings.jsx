import { useState } from "react";
import HeaderCard from "../components/ui/HeaderCard";
import {useNavigate } from "react-router-dom"



function Settings() {
      
     const navig = useNavigate()
      const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("theme");

  const options = ["Dark","Light","System"];

 

  return (
    
    <>
    <div className="p-8">
      <HeaderCard  title1="Settings"
            title2="Preferences and integrations"
            description="Theme mode, API credentials, and dashboard preferences are managed here."/>
        
        <div className="flex flex-col mt-12 gap-6 overflow">
          <button className="bg-yellow-400 p-3 text-xl hover:bg-yellow-500 rounded-xl" onClick={()=>{navig("/profile")}}>
           Edit Profile
          </button>
        
            
   <div className="relative inline-block text-left w-full">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xl text-gray-700 flex bg-yellow-400 
        justify-between items-center shadow-md hover:bg-yellow-500 focus:outline-none"
      >
        {selected}
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      
      <div
        className={`absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg border border-gray-100 py-1 origin-top transform 
          transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
            className="w-full text-right px-4 py-2 text-xl text-gray-700 hover:bg-yellow-100 
            hover:text-yellow-900 text-bold transition-colors duration-200 block "
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  


            
           
          


       </div>


    </div>
         
    </>
  );
}

export default Settings;
