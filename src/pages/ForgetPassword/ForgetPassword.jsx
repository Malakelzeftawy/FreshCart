import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"



export default function ForgetPassword(){
    const navigate = useNavigate()

    async function sendEmailToData(values){
        let id;
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
                method : "POST",
                data : values
            }
            id = toast.loading("waiting...");
            let {data} = await axios.request(options);
            console.log(data) 
            toast.dismiss(id);
            toast.success("Reset code sent to your email")
            setTimeout(()=>{
                if(data.statusMsg == "success"){
                    navigate("/auth/login/verify")
                }
            },3000)
        } catch (error) {
           toast.dismiss(id);
           toast.error(error.response.data.statusMsg)
            console.log(error);
        }
    }





    let validate = Yup.object({
        email : Yup.string().required("email is required").email("email is not valid")
    })
    let formik = useFormik({
        initialValues : {
            email : "",
        },
        validationSchema : validate,
        onSubmit : sendEmailToData,
    })
    return (<>
    <section className="flex flex-col justify-center items-center mt-6">
       <div className="w-full lg:w-1/2">
       <h2 className="font-bold text-2xl text-pink-500">Please Enter Your Email !</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
            <div>
                <input type="email" name="email" placeholder="enter your email" className="form-control w-full"
                value={formik.values.email}
                onChange={formik.handleChange} 
                />
                 {formik.errors.email && formik.touched.email ?
                 (<div className="text-red-500 font-semibold mt-2">* {formik.errors.email} </div>) :
                 (" ") }
            </div>
            
            
                <button type="submit" className="btn-primary w-fit">Verify</button>
            
        </form>
       </div>
    </section>
    </>)
}