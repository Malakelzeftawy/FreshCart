import axios from "axios";
import { useEffect, useState , useContext } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/Cart.Context";





export default function SpecificBrand(){
    const [products , setProducts ] = useState(null);
    const {addProductToCart} = useContext(cartContext)
    let {id} = useParams();
    

    async function getProductsForBrand(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
        console.log(data);
        setProducts(data.data);
    }
    useEffect(()=>{
        getProductsForBrand()
    },[])
    return(<>
    <section className="mt-8 ">
        {products == null ? (
            <Loading/>
        ) : (
            <div className="flex w-full justify-center items-center flex-col gap-3 p-2 ">
               {products.length == 0 ?
               (<div className="bg-pink-400 rounded px-8 py-24">
                <h1 className="text-gray-700 italic font-semibold text-2xl text-center">There is No products for this brand now!!!</h1>

               </div>) :


               ( products.map((product) => <div key={product._id} className="product w-full lg:w-1/2 flex flex-col  md:flex-row items-center justify-around px-3 py-3 rounded-lg shadow-xl">
                   
               
               <div className="md:w-1/3 w-1/2">
                   <img src={product.imageCover} className="w-full object-cover" alt="" />
               </div>
               <div className="text-center mt-3 w-1/2 md:w-1/3">
               <h2 className="text-2xl font-bold text-gray-700" >{product.category.name}</h2>
           <h3 className="text-pink-500 font-semibold mt-3">{product.brand.name}</h3>
           <p className="mt-3 text-sm italic text-gray-600 line-clamp-3">{product.description}</p>
           <div className="flex items-center justify-between mt-4">
               <span className="text-gray-500 font-medium">{product.price} L.E</span>
               <span className="flex gap-1 items-center">
                   <i className="fa-solid fa-star text-yellow-500 m1-1"></i>
                   <span className="text-gray-500 font-medium">{product.ratingsAverage}</span>
               </span>
           </div>
           <button
                onClick={()=>{addProductToCart({id : product.id})}}
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