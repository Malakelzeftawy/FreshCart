import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";



export default function Categories(){
    const [categories , setCategories] = useState(null)
    async function getCategories(){
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/categories`,
            method : "GET", 
        }
        let {data} = await axios.request(options);
        console.log(data);
        setCategories(data.data);
    }
    useEffect(()=>{
        getCategories()
    }, [])
    return(<>
    <section className="mt-6">
        <h1 className="font-bold text-3xl text-pink-800 mb-8 italic">All Categories... </h1>
        {categories == null ? (
            <Loading/>
        ) : (
           <div className="grid grid-cols-12 gap-6 overflow-hidden">
            {categories.map((category) => (
                <Link to={`/categories/${category._id}`} className="col-span-12 md:col-span-6 lg:col-span-3 border-1 border border-opacity-20 border-gray-800
                 hover:border-0 hover:shadow-pink-700 hover:shadow-md transition-all duration-100 ease-linear   "
                 key={category._id}>
                    <img src={category.image} className="w-full h-72 object-cover" alt="" />
                    <h1 className="font-semibold text-gray-700 text-2xl text-center my-3">{category.name}</h1>
                </Link>
            ))}
           </div>
        )}
    </section>
    </>)
}