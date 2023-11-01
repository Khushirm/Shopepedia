"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import Cart from "@/app/components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/Redux/slices/CartSlice";
import { CartProps } from "@/types";

interface Cart{
  cart:{
    cart:CartProps[];
    totalPrice:number;
  };
}

const Navbar = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const { cart } = useSelector((state: Cart) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    dispatch(updateCart());
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <header className="flex items-center px-4 justify-between fixed top-0 w-full bg-white md:px-12 py-2 z-50 shadow">
        <Link href="/">
          <Image src="/images/store.png" width={70} height={70} alt="Logo" />
        </Link>
        <div className="flex space-x-8">
          <FaOpencart
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={toggleCart}
          />
          {session.data ? (
            <button
              className="text-white bg-red-950 px-4 py-2 rounded-full font-bold hover:bg-pink-900"
              onClick={() => signOut({ redirect: false })}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/signin"
              className="text-white bg-red-950 px-4 py-2 rounded-full font-bold hover:bg-pink-900"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};
export default Navbar;
