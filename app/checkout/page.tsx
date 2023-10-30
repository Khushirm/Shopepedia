"use client";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
const Checkout = () => {
  const [user, setUser] = useState({
    name: "",
    address: "",
    phone: "",
    state: "",
    country: "",
    pincode: "",
    userEmail: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { cart, totalPrice } = useSelector((state: any) => state.cart);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const oid = Math.floor(Date.now() * Math.random());
      toast("Payment initiated! Please wait");
      const response = await axios.post("/api/pretransaction", {
        cart,
        oid,
        amount: totalPrice,
        user,
      });
      if (response.status < 200 || response.status >= 300) {
        return toast.error("Some error occured.Please try after sometime.");
      }
      if (typeof window !== undefined) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const oid = Math.floor(Date.now() * Math.random());
      toast("Payment initiated! Please wait");
      const request = await fetch("/api/pretransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice, user, cart, oid }),
      });
      if (!request.ok) {
        return toast.error("Some error occured. Please try again later.");
      }
      const response = await request.json();
      console.log(response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-wrap bg-purple-400">
        <div className="py-8 px-4">
          <div className="mt-20 font-extrabold text-3xl flex justify-center text-yellow-400">
            CHECKOUT
          </div>

          <p className="font-bold text-xl text-red-950 mt-10 ml-8 border-l-4 border-red-200 px-2">
            1. SHIPPING INFORMATION
          </p>
          <form className="mt-5 ml-7 p-2" onSubmit={initiatePayment}>
            <div className="flex flex-col text-pink-950 space-y-3">
              <div className="flex flex-col">
                <div>
                  <label htmlFor="name" className="text-lg">
                    Enter your Name:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="address" className="text-lg">
                    Enter Address:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder=" Shipping Address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    className="border border-pink-800 rounded-full px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="phone" className="text-lg">
                    Enter your Mobile number:{}
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    name="phone"
                    placeholder=" Enter Phone Number"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="city" className="text-lg">
                    Enter your city:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="state" className="text-lg">
                    Enter your state:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder=" Enter State"
                    value={user.state}
                    onChange={(e) =>
                      setUser({ ...user, state: e.target.value })
                    }
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="country" className="text-lg">
                    Enter your country:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter Country"
                    value={user.country}
                    onChange={(e) =>
                      setUser({ ...user, country: e.target.value })
                    }
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="pincode" className="text-lg">
                    Enter your pincode:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Pincode"
                    value={user.pincode}
                    onChange={(e) =>
                      setUser({ ...user, pincode: e.target.value })
                    }
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <label htmlFor="userEmail" className="text-lg">
                    Enter your email:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="userEmail"
                    placeholder="Enter Email"
                    value={user.userEmail}
                    onChange={(e) =>
                      setUser({ ...user, userEmail: e.target.value })
                    }
                    className="border border-pink-800 rounded-xl px-6 py-2"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              type="submit"
              className="mt-5 border-2 py-1 px-2  rounded-full hover:border-black text-pink-600 font-bold bg-green-300 hover:bg-yellow-200 hover:text-black"
            >
              Continue
            </button>
          </form>
        </div>
        <div className="flex flex-col">
          <div
            className={"mt-24 md:mt-44 text-3xl font-bold ml-20 text-red-950"}
          >
            <p className="border-l-4 border-red-200 px-2">Order Summary</p>
          </div>

          <div className="ml-16 mt-8 h-auto w-[280px]">
            {cart.map(
              (
                item: {
                  product:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  image: string | undefined;
                  quantity:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  price:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                },
                index: Key | null | undefined
              ) => (
                <div key={index}>
                  <h2>{item.product}</h2>
                  <img src={item.image} alt={"logo"} />
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
