import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { cartContext } from "../../Context/Cart.Context";




export default function SpecificCategory(){

    const [category , setCategory] = useState(null);
    const {addProductToCart} = useContext(cartContext);
    let {id} = useParams();

    async function getProductsForCategory(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        console.log(data);
        setCategory(data.data)
    }

    useEffect(()=>{
        getProductsForCategory()
    },[])

    return(<>
    <section className="mt-8">
        {category == null ? (
            <Loading/>
        ) : (
            <div className="flex w-full justify-center items-center flex-col gap-3 p-2 ">
               {category.length == 0 ?
               (<div className="bg-pink-400 rounded px-8 py-24">
                <h1 className="text-gray-700 italic font-semibold text-2xl text-center">There is No products for this category now!!!</h1>

               </div>) :


               ( category.map((category) => <div key={category._id} className="product w-full lg:w-1/2 flex flex-col  md:flex-row items-center justify-around px-3 py-3 rounded-lg shadow-xl">
                   
               
               <div className="md:w-1/3 w-1/2">
                   <img src={category.imageCover} className="w-full object-cover" alt="" />
               </div>
               <div className="text-center mt-3 w-1/2 md:w-1/3">
               <h2 className="text-2xl font-bold text-gray-700" >{category.category.name}</h2>
           <h3 className="text-pink-500 font-semibold mt-3">{category.brand.name}</h3>
           <p className="mt-3 text-sm italic text-gray-600 line-clamp-3">{category.description}</p>
           <div className="flex items-center justify-between mt-4">
               <span className="text-gray-500 font-medium">{category.price} L.E</span>
               <span className="flex gap-1 items-center">
                   <i className="fa-solid fa-star text-yellow-500 m1-1"></i>
                   <span className="text-gray-500 font-medium">{category.ratingsAverage}</span>
               </span>
           </div>
           <button
                onClick={()=>{addProductToCart({id : category.id})}}
                className="btn-primary w-fit mt-3"
                >Add To Cart</button>
           </div>
               
           </div>))  
            }
            </div>
        )}
    </section>
    </>)
}