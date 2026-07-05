import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecentOrderCard from "./RecentOrderCard";

const dummyOrders = [
  {
    _id: 1,
    accountType: "Admin Account",
    product: "Levi's Men's Grey",
    date: "Jul 1, 2026",
    status: "cancelled",
    totalPrice: 5266.8,
  },
  {
    _id: 2,
    accountType: "Customer Account",
    product: "Samsung S26 Ultra",
    date: "Jul 1, 2026",
    status: "shipped",
    totalPrice: 61.4,
  },
  {
    _id: 3,
    accountType: "Customer Account",
    product: "Levi's Men's Grey",
    date: "Jul 1, 2026",
    status: "pending",
    totalPrice: 9609.6,
  },
  {
    _id: 4,
    accountType: "Customer Account",
    product: "Levi's Men's Grey",
    date: "Jul 1, 2026",
    status: "delivered",
    totalPrice: 9609.6,
  },
  {
    _id: 5,
    accountType: "Customer Account",
    product: "LG Smart TV",
    date: "Jun 27, 2026",
    status: "processing",
    totalPrice: 20.384,
  },
];

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const getRecentOrders = async () => {
      // try {
      //     const [ ordersResponse , usersResponse ] = await Promise.all([
      //         api.get("/orders/admin/dashboard") ,
      //         api.get("/users/all")
      //     ])
      // const orders = ordersResponse.data.dashboard.recentOrders;
      // const users = usersResponse.data.users;

      // const updatedOrders = orders.map((order) => {

      //     const matchedUser = users.find((user) =>
      //         user._id === order.user?._id
      //     );

      //     return {
      //         ...order,

      //         accountType: matchedUser?.role === "admin" ? "Admin Account" : "Customer Account" ,
      //     }
      // })

      // setRecentOrders(updatedOrders);

      // } catch(error){
      //     console.log("error");
      // }
      ///////////////////////
      setRecentOrders(dummyOrders);
    };
    getRecentOrders();
  }, []);

  //  console.log(recentOrders)

  return (
    <section className="bg-white shadow-2xl my-7 px-5 py-6 rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between flex-col gap-2">
          <h4 className=" text-blue-600 text-lg font-thin uppercase tracking-widest">
            Recent Orders
          </h4>
          <h5 className="text-2xl">Latest Customer Activity</h5>
        </div>
        <span className="text-blue-600 py-0.5 px-3 text-sm bg-blue-100 rounded-3xl">
          {recentOrders.length} {recentOrders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      {recentOrders.map((order) => (
        <RecentOrderCard key={order._id} order={order} />
      ))}
    </section>
  );
};

export default RecentOrders;
