"use client";

import { deleteItem, updateQuantity } from "@/Redux/slices/CartSlice";
import { CartProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";

interface CartProp {
  onClose: () => void;
}
interface AppState{
  cart:{
    cart:CartProps[];
    totalPrice:number;
  }
}

const Cart: React.FC<CartProp> = ({ onClose }) => {
  const cart: CartProps[] = useSelector((state:AppState) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div
      className="pointer-events-auto w-screen max-w-md mt-[84px] fixed inset-y-0 right-0 flex pl-10 bg-opacity-75 transition-opacity z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-full flex-col overflow-y-scroll bg-rose-400 shadow-xl">
        <div className="my-2">
          <h3 className="text-xl font-bold ml-2 text-yellow-200">
            Shopping Cart
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-200">
              <th className="px-6 py-3 font-bold">Product</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3 font-bold">Quantity</th>
              <th className="px-6 py-3 font-bold">Price</th>
              <th className="px-6 py-3 font-bold">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, i) => (
              <tr key={i}>
                <td className="p-4 px-6 text-center font-bold">
                  {item.product}
                </td>
                <td className="p-4 px-6 text-center">
                  <img src={item.image} alt={"PRODUCT"} />
                </td>

                <td className="p-4 px-6 text-center">
                  <div>
                    <button
                      className="px-2 py-0 shadow font-bold"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, newnum: -1 }))
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      className="w-12 text-center bg-gray-100 outline-none"
                    />
                    <button
                      className="px-2 py-0 shadow font-bold"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, newnum: 1 }))
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4 px-6 text-center font-bold">
                  ${item.price}
                </td>
                <td className="p-4 px-6 text-center">
                  <button
                    className="px-2 py-0 text-red-100 bg-red-600 rounded hover:bg-white hover:text-black"
                    onClick={() => dispatch(deleteItem(item.id))}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-1 text-white bg-orange-600 hover:bg-white hover:text-black rounded-2xl"
            onClick={() => {
              onClose();
            }}
          >
            Back to shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
