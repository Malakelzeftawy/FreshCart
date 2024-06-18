import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";



export default function Brands(){

    const [brands , setBrands] = useState(null)
    async function getBrands(){
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/brands`,
            method : "GET", 
        }
        let {data} = await axios.request(options);
        console.log(data);
        setBrands(data.data)
    }
    useEffect(()=>{
        getBrands()
    },[])
   

    return(<>
    <section className="mt-6">
        <h1 className="font-bold text-3xl text-pink-800 mb-8 italic">All Brands... </h1>
        {brands == null ? (
            <Loading/>
        ) : (
           <div  className="grid grid-cols-12 gap-6 overflow-hidden">
            {brands.map((brand) => (
                <Link to={`/brands/${brand._id}`} className="col-span-12 md:col-span-6 lg:col-span-3 shadow-md
                cursor-pointer   hover:shadow-pink-700 hover:shadow-md transition-all duration-100 ease-linear   "
                 key={brand._id}>
                    <img src={brand.image} className="w-full object-cover" alt="" />
                    <h1 className="font-semibold text-gray-600 text-2xl text-center my-3">{brand.name}</h1>
                </Link>
            ))}
           </div>
        )}
    </section>
    </>)


}