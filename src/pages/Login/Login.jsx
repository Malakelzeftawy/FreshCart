

import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.Context";

export default function Login(){

    const [errorMsg , setErrorMsg] = useState(null);
    const {token , setToken} = useContext(userContext);
    const navigate = useNavigate();


    async function sendDataToLogin(values){

        let id;
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/auth/signin`,
                method : "POST",
                data : values
            }
            id = toast.loading("Waiting...");
            let {data} = await axios.request(options);
            console.log(data);
            toast.dismiss(id);
            toast.success("User logged-in succssefully..")
            setTimeout(()=>{
                if (data.message == "success"){
                    localStorage.setItem("token" , data.token)
                    setToken(data.token)
                    navigate("/")
                }
            },3000)
        } catch (error) {
            toast.dismiss(id);
            toast.error(error.response.data.message)
            console.log(error);
            setErrorMsg(error.response.data.message)
        }
    }

    let validate = Yup.object({
        email : Yup.string().required("email is requried").email("email is not valid"),
        password : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "passwprd is not valid"),
    })

    const formik = useFormik({
        initialValues : {
            email : "",
            password : "",
        },
        validationSchema : validate,
        onSubmit : sendDataToLogin,
    })

    return (
        <>
        <section className="flex items-center justify-center">
           <div className="w-full lg:w-1/2">
           <h2 className="flex items-center font-semibold text-pink-500 text-2xl">
                <i className="fa-regular fa-circle-user me-3"></i>
                <span>Login</span>
            </h2>
            <form className="flex flex-col gap-3 mt-4" onSubmit={formik.handleSubmit}>
                
                <div>
                    <input type="email" 
                    className="form-control w-full"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  />
                    {formik.errors.email && formik.touched.email ?
                    (<div className="text-red-500 font-semibold mt-2">* {formik.errors.email} </div>) :
                    (" ") }
                </div>

                <div>
                    <input type="password" 
                    className="form-control w-full"
                     placeholder="Password" 
                     name="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur = {formik.handleBlur}/>
                     {formik.errors.password && formik.touched.password ? 
                     (<div className="text-red-500 font-semibold mt-2">* {formik.errors.password}</div>) :
                      (" ") }
                     {errorMsg ? (<div className="text-red-500 font-semibold mt-2">* {errorMsg} </div>) : (" ") }

                </div>

                <button className="btn-primary w-fit" type="submit">Login</button>
                <Link 
                className="font-semibold underline text-gray-800 hover:text-pink-600 transition-all duration-200 ease-linear"
                to="/auth/login/forgetpassword">
                    Forget Your Password?
                </Link>
                <div className="text-gray-600 -mt-3">
                    Don't have an account??
                    <Link to="/auth/signup" className="font-semibold underline hover:text-pink-600 transition-all duration-200 ease-linear">Register</Link>
            </div>
            </form>

           </div>
        </section>
        </>
    )
}