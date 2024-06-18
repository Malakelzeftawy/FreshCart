import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import NotFound from "./pages/NotFound/NotFound"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { Toaster } from "react-hot-toast"
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword"
import Verify from "./pages/Verify/Verify"
import ResetPassword from "./pages/ResetPassword/ResetPassword"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import UserProvider from "./Context/User.Context"
import Categories from "./pages/Categories/Categories"
import Brands from "./pages/Brands/Brands"
import Contact from "./pages/Contact/Contact"
import { ProductDetails } from "./pages/ProductDetails/ProductDetails"
import SpecificBrand from "./pages/SpecificBrand/SpecificBrand"
import Cart from "./pages/Cart/Cart"
import CartProvider from "./Context/Cart.Context"
import WishList from "./pages/WishList/WishList"
import WishlistProvider from "./Context/Wishlist.context"
import Checkout from "./pages/Checkout/Checkout"
import AllOrder from "./pages/AllOrder/AllOrder"
import SpecificCategory from "./pages/SpecificCategory/SpecificCategory"



function App() {

  const routes = createBrowserRouter([
    {path: "/" , element: <ProtectedRoute>
      <Layout/>
    </ProtectedRoute> , children: [
      {path: "*" , element:<NotFound/>},
      {path : "/products" , element:<Products/>},
      {path: "/product/:id" ,element:<ProductDetails/>},
      {path : "/categories" , element : <Categories/>},
      {path : "/categories/:id" , element:<SpecificCategory/>},
      {path : "/brands" , element:<Brands/>},
      {path : "/brands/:id" , element:<SpecificBrand/>},
      {path : "/contact" , element:<Contact/>},
      {path : "/cart" , element:<Cart/>},
      {path : "/wish" , element:<WishList/>},
      {path : "/checkout" , element:<Checkout/>},
      {path : "/allorders" , element : <AllOrder/>}
    ]},
    {
      path : "/", element : <Layout/> , children : [
        {index : true , element : <Home/>}
      ]
    },
    {
      path : "/auth" , element :<Layout/> ,children : [
        {path: "signup", element:<Register/>},
        {path: "login" , element:<Login/>},
        {path : "login/forgetpassword" , element : <ForgetPassword/>},
        {path: "login/verify" , element:<Verify/>},
        {path : "login/resetpassword" , element:<ResetPassword/>},
      ]
    }
  ]);

  return (
   <>
   <UserProvider>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={routes}>
        </RouterProvider>
        <Toaster/>
      </WishlistProvider>
    </CartProvider> 
   </UserProvider>
   </>
  )
}

export default App
