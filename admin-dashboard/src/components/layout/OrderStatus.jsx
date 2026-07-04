import React ,{useEffect,useState} from "react";
import axios from "axios"; 

const OrderState=()=>{
const[stats,setStats]=useState({
Pending:0,
Processing:0,
Confirmed:0,
Shipped:0,
Delivered:0,
Cancelled:0,

})
const [error, setError] = useState(null)
useEffect(()=>{
    const OrderStatesApi=async()=>{
        try{
            const response=await axios.get("https://e-commerce-api-3wara.vercel.app/api-docs#/Orders/get_orders_my")
            setStats(response.data)
        }
        catch(error){
            setError(error.response?.data?.message) 
        }
    }
    OrderStatesApi()},[])


return(
    <>
<div className="p-5 mt-5 mx-5  rounded-xl shadow-2xl">
    <div className="flex justify-between items-center mb-6">  <span className="text-sm shadow-l  text-blue-600 tracking-[0.5em]">OrderState</span>   <span className=" p-2 text-sm rounded-xl bg-blue-100 text-blue-700">Updated from API</span>  </div>
    
    <p className="font-bold text-xl my-4 tracking-wider">live fulfillment breakdown</p>

    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-7 transition-all duration-800  ">
        <div className=" py-3 px-2 bg-amber-100 rounded-xl shadow-lg hover:-translate-y-2 border border-amber-700">   <p className="text-lg   tracking-[0.2em] text-amber-600">Pending</p>      <p className="font-bold text-xl text-amber-700">{stats.Pending}</p>   </div>
        <div className=" py-3 px-2 bg-blue-100 rounded-xl shadow-lg hover:-translate-y-2 border border-blue-700">   <p className="text-lg   tracking-[0.2em] text-blue-600">Processing</p>   <p className="font-bold text-xl text-blue-700">{stats.Processing}</p>   </div>
        <div className=" py-3 px-2 bg-blue-100 rounded-xl shadow-lg hover:-translate-y-2 border border-blue-700">   <p className="text-lg   tracking-[0.2em] text-blue-600">Confirmed</p>    <p className="font-bold text-xl text-blue-700">{stats.Confirmed}</p>   </div>
        <div className=" py-3 px-2 bg-violet-100 rounded-xl shadow-lg hover:-translate-y-2 border border-violet-700">   <p className="text-lg   tracking-[0.2em] text-violet-600">Shipped</p>      <p className="font-bold text-xl text-violet-700">{stats.Shipped}</p>   </div>
        <div className=" py-3 px-2 bg-green-100 rounded-xl shadow-lg hover:-translate-y-2 border border-green-700">   <p className="text-lg   tracking-[0.2em] text-green-600">Delivered</p>    <p className="font-bold text-xl text-green-700">{stats.Delivered}</p>   </div>
        <div className=" py-3 px-2 bg-red-100 rounded-xl shadow-lg hover:-translate-y-2 border border-red-700">    <p className="text-lg   tracking-[0.2em] text-red-600">Cancelled</p>      <p className="font-bold text-xl text-red-700">{stats.Cancelled}</p>    </div>
    </div>

</div>
    </>
)
}

export default OrderState;
