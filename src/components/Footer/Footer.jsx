import amazonLogo from "../../assets/images/amazon-pay.png";
import amricanLogo from "../../assets/images/American-Express-Color.png";
import masterCardLogo from "../../assets/images/mastercard.webp";
import payPalLogo from "../../assets/images/paypal.png";
import appStoreLogo from "../../assets/images/get-apple-store.png";
import googlePLayLogo from "../../assets/images/get-google-play.png";




export default function Footer(){
    return (<>
    <footer className="bg-slate-100 absolute left-0 right-0 bottom-0 p-2">
        <div className="container pt-4 pb-5">
           <h2 className="text-2xl font-semibold text-gray-800">Get the FreshCart App</h2>
           <p className="text-gray-600 mb-3">We will send you a link, open it on your phone to dawnload the app</p>
           <div className="flex gap-3">
            <input type="text" placeholder="Email.." className="form-control flex-grow" />
            <button className="btn-primary  ">Share App Link</button>
           </div>
           <div className="flex justify-between gap-2 items-center mt-4 flex-col lg:flex-row">
            <div className="flex gap-4 items-center justify-center">
                <span className="text-gray-800">Payment Partenrs</span>
                <div className="flex items-center gap-2 ">
                    <img src={amazonLogo} className="w-10 md:w-16" alt="" />
                    <img src={amricanLogo} className="w-10 md:w-16" alt="" />
                    <img src={masterCardLogo} className="w-10 md:w-16" alt="" />
                    <img src={payPalLogo} className="w-10 md:w-16" alt="" />
                </div>
            </div>
            <div className="flex gap-4 items-center justify-center">
            <span className="text-gray-800">Get deliveries with FreshCart</span>
                <div className="flex items-center gap-1">
                    <img src={appStoreLogo} className="w-10 md:w-16" alt="" />
                    <img src={googlePLayLogo} className="w-10 md:w-16" alt="" />
                </div>
            </div>
           </div>
        </div>
    </footer>
    </>)
}