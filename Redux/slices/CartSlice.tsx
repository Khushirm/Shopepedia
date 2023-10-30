"use client";
import { createSlice } from "@reduxjs/toolkit";
import { CartProps } from "@/types";

let items: CartProps[] = [];
if (typeof window !== 'undefined') {
    const storageItems = localStorage.getItem("cart")
    items = storageItems !== null ? JSON.parse(storageItems) : [];
}

const setCart = (items: CartProps[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: items,
    totalPrice: 0,
  },
  reducers: {
    addItem(state, action) {
      const index = state.cart.findIndex((ele) => {
        return ele.product === action.payload.name;
      });
      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.name !== action.payload);
    },
    updateCart(state) {
      setCart(state.cart);
    },
    updateQuantity(state, action) {
      const { id, newnum } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += newnum;
      }
    },
  },
});

export const { addItem, deleteItem, updateQuantity, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
