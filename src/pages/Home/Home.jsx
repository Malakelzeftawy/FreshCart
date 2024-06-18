import { Link } from "react-router-dom";
import cart from "../../assets/images/cart.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section>
        <div className="grid grid-cols-12 items-center justify-between gap-4  w-full mt-3  ">
          <div className="col-span-12 md:col-span-6 mx-auto ">
            <h1 className="text-5xl font-bold text-gray-800">FreshCart</h1>
            <p className="font-semibold text-2xl text-gray-700 mt-3">
              We have something special for everyone!
            </p>
            <p className="font-semibold text-2xl text-gray-700 mt-3">
              You will find everything you need here{" "}
            </p>
            <button className="btn-primary mt-3">
              <Link to="/products">Buy Now</Link>
            </button>
          </div>
          <div className="col-span-12  md:col-span-6 ">
            <img src={cart} className="w-full " alt="" />
          </div>
          <div className="col-span-12 mt-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Shop Popular Categories
            </h2>
            {categories == null ? (
              <Loading />
            ) : (
              <swiper-container loop={true} slides-per-view={4}>
                {categories.map((category) => (
                  <swiper-slide key={category._id}>
                    <div>
                      <img
                        src={category.image}
                        className="w-full h-72 object-cover"
                        alt=""
                      />
                      <h1 className="textgray-800 font-semibold">
                        {category.name}
                      </h1>
                    </div>
                  </swiper-slide>
                ))}
              </swiper-container>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
