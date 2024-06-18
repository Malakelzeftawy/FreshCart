import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useContext, useEffect } from "react";
import { userContext } from "../../Context/User.Context";
import { cartContext } from "../../Context/Cart.Context";


export default function Navbar(){
    const {token , logout} = useContext(userContext);
    const {getCartInfo , cartInfo} = useContext(cartContext);

    useEffect(()=>{
        getCartInfo()
    },[])



    return(<>
    <nav className={`${styles.nav} nav bg-slate-100 py-3 fixed right-0 left-0 top-0  px-2`}>
        <div className="container flex items-center justify-between ">
            <Link to="/">
            <h1 className="text-gray-700 text-3xl font-bold">FreshCart 
            <span className="text-pink-500 font-bold text-4xl">.</span>
            </h1>
            </Link>







            <ul className="hidden md:flex gap-3 items-center  ">
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/products">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/categories">
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/brands">
                        Brands
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/wish">Wish List</NavLink>
                </li>
                <li>
                    <NavLink
                    className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/allorders">
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/contact">
                        Contact
                    </NavLink>
                </li>
            </ul>



            {token ? (
                <Link to="/cart" className="ms-auto md:ms-0 me-8 relative">
                <i className="fa-solid fa-shopping-cart text-lg "></i>
                <span className="bg-pink-500 text-white absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-5 h-5 flex justify-center items-center rounded-full text-lg ">
                 {cartInfo == null ? (<i className="fa-solid fa-spinner fa-spin"></i>) : (cartInfo.numOfCartItems  || 0)}
                </span>
            </Link>
            ) : ("")}



            <ul className="hidden md:flex gap-3 items-center">
                
                {!token ? (
                    <>
                    <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }} to="/auth/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => {
                        return `font-semibold text-gray-800 relative before:h-[2px] hover:before::w-full  before:transition-all before:duration-300 before:left-0 before:-bottom-1 before:bg-pink-500 before:absolute hover:before:w-full
                        ${isActive ? "font-bold text-gray-950 before:w-full" : "before:w-0"}`
                    }}  to="/auth/signup">
                        Register
                    </NavLink>
                </li>
                    </>
                ) : (
                    <li className="cursor-pointer">
                    <span onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                    </span>
                </li>
                )}
            </ul>



            <div className=" icon relative md:hidden">
            <button className="border-2 px-2 rounded-md border-gray-600 flex justify-center items-center">
            <i className="fa-solid fa-bars text-3xl "></i>
            </button>
            <div className="list absolute opacity-0 transition-all duration-200 ease-linear bg-slate-100 px-5 right-0 rounded-md py-3 border w-40 ">
            <ul className=" mb-4 ">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/products">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories">
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/brands">
                        Brands
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact">
                        Contact
                    </NavLink>
                </li>
            </ul>
            <ul className="">
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        Register
                    </NavLink>
                </li>
                <li>
                    <a href="">
                        <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                    </a>
                </li>
            </ul>
            </div>
          </div>
        </div>
    </nav>
    </>)
}