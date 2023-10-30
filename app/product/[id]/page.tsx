
"use client";
import axios from "axios";
import { Product } from "@/types";
import Image from "next/image";
import BuyNowButton from "@/app/components/BuyNowButton";
import { BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const ProductPage = ({ params: { id } }: any) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://ecomm-store-api.vercel.app/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 px-4 mt-48 pb-10">
      <div className="relative max-h-74 flex-1 object-contain flex justify-center">
        <Image
          src={product.images[1]}
          alt="image"
          width={450}
          height={450}
          className="transition ease-in-out delay-150 rounded-3xl hover:-translate-y-1 hover:scale-110 duration-300"
        />
      </div>
      <div className="flex-1">
        <div className="space-y-2 pb-8">
          <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
          <h2 className="text-green-500 font-bold text-xl md:text-3xl">
            ${product.price}
          </h2>
          <div className="flex items-center">
            <div className="">
              <BsStarFill className="fill-pink-950" />
            </div>
            <div className="ml-1">
              <h2 className="text-xl">{product.rating}</h2>
            </div>
          </div>
        </div>
        <div className="pt-1">
          {product.about.map((item, index) => (
            <p key={index} className="text-sm md:text-sm">
              {item}
            </p>
          ))}
        </div>
        <BuyNowButton product={product} toggleCart={toggleCart} />
      </div>
    </div>
  );
};

export default ProductPage;