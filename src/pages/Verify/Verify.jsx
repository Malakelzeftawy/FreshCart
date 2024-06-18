import axios from "axios"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"



export default function Verify(){
    const navigate = useNavigate()

    async function verifyCode(values){
        let id;
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
                method : "POST",
                data : values  
            }
            id = toast.loading("waiting...");
            let {data} = await axios.request(options);
            console.log(data);
            toast.dismiss(id);
            toast.success("Verification successed")
            setTimeout(()=>{
                if(data.status == "Success"){
                    navigate("/auth/login/resetpassword")
                }
            },3000)
        } catch (error) {
            toast.dismiss(id);
            toast.error(error.response.data.status);
            console.log(error);
        }
    }

    let validate = Yup.object({
        resetCode : Yup.string().required("code is required"),
    })
    let formik = useFormik({
        initialValues : {
            resetCode : "",
        },
        validationSchema : validate,
        onSubmit : verifyCode,
    })
    return(<>
    <section className="flex flex-col justify-center items-center mt-6">
        <div className="w-full lg:w-1/2">
            <h2 className="font-bold text-pink-500 text-2xl">
            Please enter your verification code !
            </h2>
            <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="resetCode" 
                    placeholder="enter your code"
                    className="form-control w-full"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange} />
                </div>

                <button type="submit" className="btn-primary w-fit">Submit</button>
            </form>
        </div>
    </section>
    </>)
}