import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

function Product({ product }: { product: Product }) {
  console.log(product);
  
  return (
    <Link
      href={`/product/${product._id}`}
      className="h-auto flex flex-col p-5 rounded  border-2 shadow group"
    >
      <div className="relative shadow-2xl max-h-74 w-full flex-1 object-contain flex items-center justify-center">
        <Image src={product.images[0]} alt="image" width={200} height={300} className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"/>
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold line-clamp-2 truncate w-[300px] sm:w-[500px]">{product.name}</p>
        <p className="font-bold text-green-500">${product.price}</p>
        <p className="text-xs text-gray-500 line-clamp-2 w-[300px] sm:w-[500px]">{product.about[0]}</p>
      </div>
    </Link>
  );
}

export default Product;
