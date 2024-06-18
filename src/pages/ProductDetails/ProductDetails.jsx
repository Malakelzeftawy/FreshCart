import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../Context/Cart.Context";



export function ProductDetails(){
    const [details , setDetails ] = useState(null);
    let {id} = useParams();
    console.log(id);
    const {addProductToCart} = useContext(cartContext)
    async function getProductDetails(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        console.log(data)
        setDetails(data.data)
    }
    const imageItem = details?.images.map((imageURL)=> {
        return {
            original : imageURL ,
            thumbnail : imageURL,
        }
    });
    useEffect(()=>{
        getProductDetails()
    },[])
    return(<>
    <section className="mt-6 ">
        {details == null ? (
            <Loading/>
        ) : (
            <div className="flex w-full justify-center items-center ">
                <div className="w-full lg:w-1/2 flex flex-col  md:flex-row items-center justify-around px-3 py-3 rounded-lg shadow-xl">
                   
               
                    <div className="md:w-1/3 w-1/2">
                    <ReactImageGallery 
                items={imageItem}
                showNav={false}
                showFullscreenButton={false}
                showPlayButton={false}/>
                        {/* <img src={details.images[0]} className="w-full object-cover" alt="" /> */}
                    </div>
                    <div className="text-center mt-3 w-1/2 md:w-1/3">
                    <h2 className="text-2xl font-bold text-gray-700" >{details.title}</h2>
                <h3 className="text-pink-500 font-semibold mt-3">{details.category.name}</h3>
                <p className="mt-3 text-sm italic text-gray-600">{details.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-500 font-medium">{details.price} L.E</span>
                    <span className="flex gap-1 items-center">
                        <i className="fa-solid fa-star text-yellow-500 m1-1"></i>
                        <span className="text-gray-500 font-medium">{details.ratingsAverage}</span>
                    </span>
                </div>
                <button
                onClick={()=>{addProductToCart({id : details.id})}}
                className="btn-primary w-fit mt-3"
                >Add To Cart</button>
                    </div>
                    
                </div>
            </div>
        )}
    </section>
    </>)
}