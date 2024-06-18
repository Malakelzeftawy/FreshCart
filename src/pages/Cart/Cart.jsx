import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.Context";
import Loading from "../../components/Loading/Loading";


export default function Cart(){
    const { cartInfo , removeProductFromCart , updateProductCount , clearCart} = useContext(cartContext);

   
    return(<>
    {cartInfo == null ? (
        <Loading/>
    ) : (
        <section className="bg-slate-100 p-5 mt-8">
        <div>
            <div>
            <h2 className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">Shop Cart</span>
                <i className="fa-solid fa-shopping-cart text-xl text-pink-500"></i>
            </h2>
            </div>


            {cartInfo.length == 0 ? (
                 <div className="py-16 flex flex-col justify-center items-center gap-2">
                 <h3 className="text-lg font-semibold italic text-gray-800">There is no items here!</h3>
                 <Link to="/products" className="btn-primary">Add Your First Product To Cart</Link>
             </div>
            ) : (
                <div>
                <div className="product grid grid-cols-12  gap-4 mt-10 ">
                {cartInfo.data.products.map((product) =>
                     <div key={product._id} className="bg-white col-span-12 sm:col-span-6  lg:col-span-3  rounded-md overflow-hidden shadow-lg ">
                    <div>
                        <img src={product.product.imageCover} className="w-full h-48 object-contain" alt="" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xl font-semibold text-gray-800 italic line-clamp-2">{product.product.title}</h3>
                        <h4 className="text-pink-500 text-lg font-medium ">price : {product.price} L.E</h4>
                        <button
                        onClick={()=>{
                            removeProductFromCart({id : product.product.id})
                        }}
                        className="btn-primary bg-gray-800 flex items-center gap-1 px-2 py-1 mt-3">
                            <i className="fa-solid fa-trash-can "></i>Remove
                        </button>
                        <div className="mt-3 flex justify-between items-center">
                            <button
                            onClick={()=>{
                                updateProductCount({id:product.product.id , count :product.count - 1})
                            }}
                            className="btn-primary px-2 py-1">
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="text-lg font-semibold text-gray-800">{product.count}</span>
                            <button
                            onClick={()=>{
                                updateProductCount({id:product.product.id , count :product.count + 1})
                            }}
                            className="btn-primary px-2 py-1">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>)}
                
            </div>
            <button
        onClick={clearCart}
        className="btn-primary bg-gray-800 mt-10 block ms-auto">Clear Cart</button>
            </div>
            
            )}


        </div>
        
       


    </section>
    )}
    <Link to="/checkout" className="btn-primary mt-6 block ms-auto w-fit">Next Step</Link>
    </>)
}