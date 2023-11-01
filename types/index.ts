export type ProductType = {
  data: Product[];
};

export interface Product {
  title: string;
  _id: string;
  name: string;
  images: string[];
  price: number;
  about: string[];
  rating: number;
  mrp:number;
  discount:number;
};

export interface ChildrenType {
  children: React.ReactNode;
};
export interface CartProps {
  product: any;
  id: number;
  name: string,
  price: number,
  quantity: number,
  category: string;
  image: string;
};

export interface StripeCartProps {
  cart: CartProps[];
  oid: string;
  amount: Number;
}