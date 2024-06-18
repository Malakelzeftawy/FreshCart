
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword(){
    const navigate = useNavigate()

    async function reset(values){
        let id;
        try {
            let options ={
                url : `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
                method: "PUT",
                data : values
            }
            id = toast.loading("waiting...")
            let {data} = await axios.request(options);
            console.log(data);
            toast.dismiss(id);
            toast.success("Reset password is done ");
            setTimeout(()=>{
                    navigate("/")               
            },3000)
        } catch (error) {
            toast.dismiss(id);
            toast.error(error.response.data.statusMsg)
            console.log(error)
        }
    }

    let validate = Yup.object({
        email : Yup.string().required("email is requried").email("email is not valid"),
        newPassword : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "passwprd is not valid"),
    })
    const formik = useFormik({
        initialValues : {
            email : "",
            newPassword : "",
        },
        validationSchema : validate,
        onSubmit : reset,
    })
    return(<>
    <section className="flex items-center justify-center">
           <div className="w-full lg:w-1/2">
           <h2 className="flex items-center font-semibold text-pink-500 text-2xl">
                <i className="fa-regular fa-circle-user me-3"></i>
                <span>Reset Password</span>
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
                     name="newPassword"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur = {formik.handleBlur}/>
                     {formik.errors.password && formik.touched.password ? 
                     (<div className="text-red-500 font-semibold mt-2">* {formik.errors.password}</div>) :
                      (" ") }

                </div>

                <button className="btn-primary w-fit" type="submit">Reset Password</button>
               
            </form>

           </div>
        </section>
    </>)
}