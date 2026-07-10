import { useState } from "react";
function Settings() {
const [preferences  , setpreferences ] = useState (false) 
 

  return (
    
    <>
    <div className="p-5">

    <div className="w-ful h-35 bg-yellow-200 rounded-xl">

         </div>
         <div className="mt-10 flex gap-3">
        <button className="flex-1 bg-red-300 p-2 rounded-xl" onClick={()=>{setpreferences (true)}}>preferences </button>
        <button className="flex-1 bg-red-300 p-2 rounded-xl" >theme</button>

        <div className={`absolute w-300 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300/70 rounded-2xl p-5 ${preferences  ? 'file-sh':`file-h`}`}>
        <div className="h-80"></div>
        <hr className="w-[70%] m-auto my-2"/>
        <button className="px-3 py-1 bg-yellow-200" onClick={()=>{setpreferences (false)}}>Closes</button>
        </div>

         
         </div>


    </div>
         
    </>
  );
}

export default Settings;