import Product from "./Product";

import Image from "next/image";

type Props = {
  product: Product;
  fill?: boolean;
};

function ProductImage({ product, fill }: Props) {
  
  return (
    <>
      {fill ? (
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className={`object-contain`}
        />
      ) : (
        <Image
          src={product.images[0]}
          alt={product.title}
          width={400}
          height={1000}
          className={`object-contain`}
        />
      )}
    </>
  );
}
export default ProductImage;