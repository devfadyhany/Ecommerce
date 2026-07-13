import { useState ,useEffect } from "react";
import api from "../api/axios"
import { set } from "react-hook-form";
 import dayjs from 'dayjs';



function Profile() {
  const [loading, setLoading] = useState(false);
 const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "",
    updatedAt: "",
});

const [openEdit, setOpenEdit] = useState(false);
const [editUsername, setEditUsername] = useState("");
const [editEmail, setEditEmail] = useState("");
const [editPhone, setEditPhone] = useState("");
        const numericDate = dayjs(userData.updatedAt)
    
   
        useEffect(() => {

            const apidataprofile =async ()=>{
                try{
                     setLoading(true)
                     const res =await api.get("/auth/me") 
                     console.log(res.data.user.updatedAt)
                   setUserData({
            username: res.data.user.username,
            email: res.data.user.email,
            phone: res.data.user.phone,
            avatar: res.data.user.avatar,
            updatedAt: res.data.user.updatedAt,
        });
                }catch(e){
                    console.log(e)
                }finally{
                    setLoading(false)
                }
               

            }
            apidataprofile()
        }, [setUserData]);
        



    

   const handleSave = async () => {
    try {
        setLoading(true);

        await api.patch("/auth/me", {
            username: editUsername,
            email: editEmail,
            phone: editPhone,
        });

    
                await apidataprofile();

      
        setOpenEdit(false);

    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
};


const handleOpenEdit = () => {
    setEditUsername(username);
    setEditEmail(email);
    setEditPhone(phone);

    setOpenEdit(true);
};


   function inputdisabild(valueEdit,title){
    
    const result=     <div className="relative">
                        <input type="text" disabled className="w-full border h-12 rounded-md tracking-[1.5px] pt-4 pl-2" value={valueEdit}/>
                           <p className="absolute top-[1px] text-sm left-2 text-blue-400">{title}</p>                                  
                        </div>
    return result

   }
   function inputdisabild2(valueEdit,title){
   
     const result=    <div className="flex-1 relative">
                        <input type="text" disabled className=" w-full h-12 border rounded-md tracking-[1.5px] pt-4 pl-2"value={valueEdit}/>
                        <p className="absolute top-[1px] left-2 text-sm text-blue-400">{title}</p>
                     </div>
       
     return result  
   }
   function Editdata(val,placeholder){
    const result =<input
               className="w-full border p-2 rounded-md"
                placeholder={placeholder}
                value={val}
                onChange={(e) => setEditPhone(e.target.value)}
                />
        return result
   }
   

    
if(loading){
    return(
       <div className="flex justify-center items-center h-screen">
            <div className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div> 
    )
}else{
    return (
        
        <>
            <div className="p-3 w-full h-175">
                <div className="space-y-5 w-full h-175 bg-gray-300 rounded-xl pt-30 flex flex-col items-center ">

                    <div className="">

                        <img src={userData.avatar} className="w-20 h-20" />
                    </div>
                    <div className="p-5 space-y-4 w-[90%] lg:w-[78%] h-auto bg-gray-500 rounded-xl">
                      {inputdisabild(userData.username,"Your name")}
                      {inputdisabild(userData.email, "Enail")}
                      {inputdisabild(localStorage.getItem("password"),"Password")}
                      {inputdisabild(userData.phone,"phone")}
                       

                        <div className="flex gap-4 ">
                          
                         {inputdisabild2(numericDate.year(),"Year")}
                         {inputdisabild2(numericDate.format("DD/MMMM"),"Date")}
                         {inputdisabild2(numericDate.format(" HH:mm"),"Time")}

                            

                        </div>
                                           
                      <button
                            onClick={() => setOpenEdit(true)}
                            className="w-full h-10 text-xl bg-yellow-400 hover:bg-yellow-500 tracking-[2px] rounded-md"
                        >
                            Update
                        </button>
                    </div>

          
                </div>
               {openEdit && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-white w-[420px] rounded-xl p-6 space-y-4">

                            <h2 className="text-2xl font-bold text-center">
                                Update Profile
                            </h2>
                              { Editdata(editUsername,"Username")}
                              { Editdata(editEmail,"Email")}
                              { Editdata(editPhone,"Phone")}
                            
                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() => setOpenEdit(false)}
                                    className="px-5 py-2 bg-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500  text-white rounded-md"
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>
)}
            </div>

        </>
    )
}
}
   

    
export default Profile
