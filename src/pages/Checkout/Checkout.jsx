import { useFormik } from "formik"
import { useContext, useState } from "react"
import { cartContext } from "../../Context/Cart.Context"
import { userContext } from "../../Context/User.Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function Checkout(){


    const navigate = useNavigate()

    const {cartInfo , setCartInfo} = useContext(cartContext);
    const {token} = useContext(userContext);
    const [orderType , setOrederType] = useState(null)

    async function createCashOrder(values){
        console.log("cash")
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
            method : "POST",
            headers : {
                token
            },
            data : {
                values,
            }
        };
        let {data} = await axios.request(options);
        console.log(data);
        setCartInfo([]);
       setTimeout(() => {
      navigate("/allorders");
    }, 2000);
    }

    async function createOnlineOrder(values){
        console.log("online")
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
            method : "POST",
            headers : {
                token
            },
            data : {
                values,
            }
        };
        let {data} = await axios.request(options);
        console.log(data);
        toast.loading("redirect to payment gateway");
        setTimeout(() => {
            if (data.status === "success") {
              window.location.href = data.session.url;
            }
          }, 3000);
    }
   

    const formik = useFormik({
        initialValues : {
        shippingAddress : {
           details: "",
           phone: "",
           city: ""
        },
        },
        onSubmit : (values)=>{
           if (orderType == "cash"){
            createCashOrder(values)
           }else if (orderType == "online"){
            createOnlineOrder(values)
           }
        }
    })

    return(<>
    <section className="mt-8 flex justify-center items-center">
        <div className="w-full lg:w-1/2">
            <h2 className="font-bold text-3xl text-pink-800 mb-8 italic ">Shipping Address...</h2>
            <form  className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" className="form-control w-full" placeholder="your city..."
                    name="shippingAddress.city"
                    value={formik.values.shippingAddress.city} 
                    onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <input type="tel" className="form-control w-full" placeholder="your phone..."
                    name="shippingAddress.phone"
                    value={formik.values.shippingAddress.phone}
                    onChange={formik.handleChange}/>
                </div>
                <div>
                    <textarea className="form-control w-full " placeholder="any details...?"
                    name="shippingAddress.details"
                    value={formik.values.shippingAddress.details}
                    onChange={formik.handleChange}
                    ></textarea>
                </div>
                <div className="flex items-center gap-3">


                <button
                onClick={()=>{
                    setOrederType("cash")
                }}
                type="submit" className="btn-primary w-fit">Cash Order</button>



                <button 
                onClick={()=>{
                    setOrederType("online")
                }}
                type="submit" className="btn-primary w-fit bg-pink-800 hover:bg-pink-500">Online Order</button>
                </div>
            </form>
        </div>
    </section>
    </>)
}