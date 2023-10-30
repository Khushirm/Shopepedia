"use client";

import Button from "./ProductButton";
import { useDispatch } from "react-redux";
import { addItem, deleteItem } from "@/Redux/slices/CartSlice";
import Link from "next/link";

const BuyNowButton = ({
  product,
  toggleCart,
}: {
  product: any;
  toggleCart: () => void;
}) => {
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
