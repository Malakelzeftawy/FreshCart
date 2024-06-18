import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";



export default function Products(){

    const [products , setProducts] = useState(null);


    async function getProducts(){
        const options ={
            url : `https://ecommerce.routemisr.com/api/v1/products`,
            method : "GET", 
        }
        let {data} = await axios.request(options);
        console.log(data);
        setProducts(data.data);
    }


    useEffect(()=>{
        getProducts()
    } , [])




    




   

    return (<>
    <section className="mt-8">
        <h2 className="font-bold text-3xl text-pink-800 mb-8 italic">All Products...</h2>
        {products == null ? (
            <Loading/>
        ) : (
            <div className="grid grid-cols-12 gap-4">
                {products.map((product)=> 
                (<ProductCard productInfo = {product} key={product._id}  />) )}
            </div>
        )}
    </section>
    </>)
}