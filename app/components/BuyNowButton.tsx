"use client";

import Button from "./ProductButton";
import { useDispatch } from "react-redux";
import { addItem } from "@/Redux/slices/CartSlice";
import Link from "next/link";

interface ProductType{
  name:string;
  price:number;
  images:string[];
}
interface BuyNowButtonProps{
  product:ProductType;
  toggleCart:()=>void;
}

const BuyNowButton = ({
  product,
  toggleCart
}: BuyNowButtonProps)=> {
  const dispatch = useDispatch();

  const getCartDetails = () => {
    const cartDetails = {
      product: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    dispatch(addItem(cartDetails));
    toggleCart(); 
  };
  const addToCart = () => {
    const cartDetails = {
      product: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    dispatch(addItem(cartDetails));
  };
  return (
    <div className="flex justify-between mt-2">
      <Link href="/checkout">
        <Button onClick={getCartDetails}>Buy Now</Button>
      </Link>
      <Button onClick={addToCart}>Add To Cart</Button>
    </div>
  );
};
export default BuyNowButton;
