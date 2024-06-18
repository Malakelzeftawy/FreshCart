import { useContext, useEffect, useState } from "react"
import { userContext } from "../../Context/User.Context"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";



export default function AllOrder(){


    const [orders , setOrders] = useState(null)
    const {token} = useContext(userContext);
    const {id} = jwtDecode(token);
    console.log(id);

    async function getUserOrder(){
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method : "GET",
        };
        let {data} = await axios.request(options);
        console.log(data)
        setOrders(data)

    }

    useEffect(()=>{
        getUserOrder()
    },[])


    return(<>
    {orders == null ? (
        <Loading/>
    ) : (
        <section className="mt-8 flex justify-center items-center">
        <div className="w-full lg:w-2/3">
        <h2 className="font-bold text-3xl text-pink-800 mb-8 italic">All Orders...</h2>
         {orders.map((order)=>  
         <div key={order.id} className="order border px-3 py-2 border-gray-500 rounded-lg border-opacity-50 shadow mt-3">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="text-lg font-medium text-gray-500 italic">Order ID</h2>
                    <span className="text-xl font-semibold text-gray-700"># {order.id}</span>
                </div>
                <div className="flex gap-2">
                    {order.isDelivered ? (
                        <span className="btn-primary rounded-3xl">تم التوصيل</span>
                    ) : (
                        <span className="btn-primary rounded-3xl">قيد التوصيل</span>
                    )}

                    {order.isPaid ? (
                     <span className="btn-primary bg-pink-800 hover:bg-pink-500 rounded-3xl">تم الدفع</span> ) : (
                        <span className="btn-primary bg-pink-800 hover:bg-pink-500 rounded-3xl">غير مدفوع</span>
                     )}




                </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-4">
                {order.cartItems.map((product)=> 
                <div key={product.product._id} className="product col-span-6 md:col-span-3 lg:col-span-2 border border-gray-300 rounded">
                    <img src={product.product.imageCover} className="w-full h-48 object-contain" alt="" />
                    <div className="px-2 py-1">
                    <h2 className="text-gray-800 font-medium text-lg">{product.product.title }</h2>
                    <h3 className="text-pink-500 font-medium">{product.price} L.E</h3>
                    </div>
                </div> 
                )}
               
            </div>
          </div>
         )}
        </div>
    </section>
    )}
    </>)
}