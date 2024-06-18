import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/Wishlist.context";
import Loading from "../../components/Loading/Loading";


export default function WishList(){


    const {wishlistInfo , getWishlistInfo , removeProductFromWishlist } = useContext(wishlistContext);
    useEffect(()=>{
        getWishlistInfo()
    },[])
    return (<>
   {wishlistInfo == null ? (
    <Loading/>
   ) : (
    <section className="bg-slate-100 p-5 mt-8">
    <div>
        <div>
        <h2 className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">Wish List</span>
            <i className="fa-solid fa-heart text-xl text-pink-500"></i>
        </h2>
        </div>

        {wishlistInfo.length == 0 ? (
             <div className="py-16 flex flex-col justify-center items-center gap-2">
             <h3 className="text-lg font-semibold italic text-gray-800">There is no items here!</h3>
             <Link to="/products" className="btn-primary">Add Your First Product To Wish List</Link>
         </div>
        ) : (

            <div>
                <div className="product grid grid-cols-12  gap-4 mt-10 ">
                   {wishlistInfo.data.map((product)=> <div key={product._id} className="bg-white col-span-12 sm:col-span-6  lg:col-span-3  rounded-md overflow-hidden shadow-lg ">
                    <div>
                        <img src={product.imageCover} className="w-full h-72 object-cover" alt="" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xl font-semibold text-gray-800 italic line-clamp-2">{product.title}</h3>
                        <h4 className="text-pink-500 text-lg font-medium ">price {product.price} :  L.E</h4>
                        <button
                        onClick={()=>{
                            removeProductFromWishlist({id : product._id})
                        }}
                        className="btn-primary bg-gray-800 flex items-center gap-1 px-2 py-1 mt-3">
                            <i className="fa-solid fa-trash-can "></i>Remove
                        </button>
                        
                    </div>
                    </div>)}
                
               </div>
               {/* <button  className="btn-primary bg-gray-800 mt-10 block ms-auto">Clear wishlist</button> */}
            </div>
        )}
    </div>
</section>
   )}
    </>)
}