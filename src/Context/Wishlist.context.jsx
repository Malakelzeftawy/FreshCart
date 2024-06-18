import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "./User.Context";



export const wishlistContext = createContext(null);

export default function WishlistProvider({children}){

    const [wishlistInfo , setWishlistInfo] = useState(null)
    const {token} = useContext(userContext);

    async function getWishlistInfo(){
        try {
            const options = {
                url :  `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method : "GET",
                headers : {
                    token,
                },
            };
            let {data} = await axios.request(options);
            console.log(data);
            setWishlistInfo(data);
        } catch (error) {
            console.log(error)
            if(error.response.data.message.includes("No wishlist")){
                setWishlistInfo([])
            }
        }
    }
 

    async function addProductToWishlist({id}){
        try {
            const options ={
                method : "POST",
                url : `https://ecommerce.routemisr.com/api/v1/wishlist`,
                headers : {
                    token,
                },
                data : {
                    productId : id,
                },
            };
            let {data} = await axios.request(options);
            console.log(data);
            toast.success("product added to wish list ")
            setWishlistInfo(data)
           } catch (error) {
            console.log(error)
           }
    }



    async function removeProductFromWishlist({id}){
        try {
            const options ={
                method : "DELETE",
                url : `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                headers : {
                    token,
                },
            };
            let {data} = await axios.request(options);
            console.log(data);
            setWishlistInfo(data);
            toast.success("product removed successfully");
            
           } catch (error) {
            console.log(error)
           }
    }


    return(
        <wishlistContext.Provider value={{getWishlistInfo , addProductToWishlist , removeProductFromWishlist , wishlistInfo , setWishlistInfo}} >
            {children}
        </wishlistContext.Provider>
    )
}