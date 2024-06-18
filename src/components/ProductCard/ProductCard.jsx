import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cartContext } from "../../Context/Cart.Context";
import { wishlistContext } from "../../Context/Wishlist.context";



export default function ProductCard({productInfo}){
    const {images, title , price , category , ratingsAverage , id} = productInfo;
    const {addProductToCart} = useContext(cartContext);
    const {addProductToWishlist} = useContext(wishlistContext);
    const [btnState , setBtnState] = useState(false);

    function handleSubmit(){
        setBtnState(btnState => ! btnState);
    }

    let toggleClassClick = btnState ? "text-red-900" : " ";
    return(<>
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-md overflow-hidden shadow-lg">
        <div className="relative">
            <img src={images[0]} className="w-full" alt="" />
            <div className="layer  opacity-0 hover:opacity-100 transition-opacity duration-300 absolute left-0 top-0 bg-black bg-opacity-15 w-full h-full flex gap-2 items-center justify-center">
           
           
           
           
            <div
            onClick={()=>{
                addProductToWishlist({id})
                handleSubmit()
            }}
            className={`icon text-white ${toggleClassClick} bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300`}>
                <i className="fa-solid fa-heart"></i>
            </div>



            <div 
            onClick={()=>{addProductToCart({id})}}
            className="icon text-white bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link to={`/product/${id}`} className="icon text-white bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300">
                <i className="fa-solid fa-eye"></i>
            </Link>
            </div>
        </div>
        <div className="px-3 py-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h2>
        <h3 className="text-lg  text-pink-500 mb-2 line-clamp-2">{title}</h3>
        <div className="flex justify-between items-center">
            <span className="text-gray-800 ">{price} L.E</span>
            <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <span>{ratingsAverage}</span>
            </div>
        </div>
        
        </div>
    </div>
    </>)
}