import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



export default function Register(){

    const [errorMsg , setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


    async function sendDataToRegister(values){
        let id;
        try {
            const options = {
                url : `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                method : "POST",
                data : values
            }
            id = toast.loading("Waiting...");
            let {data} = await axios.request(options);
            console.log(data);
            toast.dismiss(id);
            toast.success("User created succssefully..")
            setTimeout(()=>{
                if (data.message == "success"){
                    navigate("/auth/login")
                }
            },3000)
        } catch (error) {
            toast.dismiss(id);
            // toast.error(error.response.data.message)
            console.log(error);
            setErrorMsg(error.response.data.message)
        }
    }



    const validate = Yup.object({
        name : Yup.string().required("name is required").min(3, "name must be more than 3 character").max(25, "name must be less than 25 character"),
        email : Yup.string().required("email is requried").email("email is not valid"),
        phone : Yup.string().required("phone is required").matches(phoneRegex , "phone is not valid"),
        password : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "password is not valid"),
        rePassword : Yup.string().required("repassword is required").oneOf([Yup.ref("password")]),
    }) 
    let formik = useFormik({
        initialValues : {
            name : "",
            email : "",
            phone : "",
            password : "",
            rePassword : "",
        },
        onSubmit : sendDataToRegister,
        validationSchema : validate
      
    })

    return(<>
    <section className="flex items-center justify-center ">
        <div className="w-full lg:w-1/2">
           <h2 className="flex items-center font-semibold text-pink-500 text-2xl">
            <i className="fa-regular fa-circle-user me-3"></i>
            <span>Register Now</span>
           </h2>
           <form className="flex flex-col gap-3 mt-4" onSubmit={formik.handleSubmit}>
            <div>
                <input type="text" placeholder="UserName" className="form-control w-full"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? 
                     (<div className="text-red-500 font-semibold mt-2">* {formik.errors.name}</div>) :
                 (" ") }
            </div>
            <div>
                <input type="email" placeholder="Email" className="form-control w-full" 
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ?
                (<div className="text-red-500 font-semibold mt-2">* {formik.errors.email}</div>) :
                 (" ")}
                 {errorMsg ? (<div className="text-red-500 font-semibold mt-2">* {errorMsg} </div>) : (" ") }
            </div>
            <div>
                <input type="tel" placeholder="Phone" className="form-control w-full"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ?
                (<div className="text-red-500 font-semibold mt-2">* {formik.errors.phone}</div>) :
                 (" ")}
            </div>
            <div>
                <input type="password" placeholder="Password" className="form-control w-full"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ?
                (<div className="text-red-500 font-semibold mt-2">* {formik.errors.password}</div>) :
                 (" ")}
            </div>
            <div>
                <input type="password" placeholder="Re-password" className="form-control w-full"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword ?
                (<div className="text-red-500 font-semibold mt-2">* {formik.errors.rePassword}</div>) :
                 (" ")}
            </div>
            <button type="submit" className="btn-primary w-fit">Register</button>
            <div className="text-gray-600">
                Already have an account??<Link to="/auth/login" className="font-semibold underline hover:text-pink-600 transition-all duration-200 ease-linear">Login</Link>
            </div>
           </form>
        </div>
    </section>
    </>)
}