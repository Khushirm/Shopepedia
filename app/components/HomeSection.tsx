import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const HomeSection = () => {
  return (
    <main
      className={`flex flex-col w-full h-[80vh] items-center bg-[url("/images/ecom.jpg")] bg-no-repeat bg-cover`}
    >
      <h1 className="font-bold text-3xl mt-28 text-black">
        {" "}
        Shop Smart , <span className="text-rose-950 text-4xl animate-pulse">Shop Easy</span>
      </h1>
      <p className="text-yellow-300 text-3xl font-bold animate-bounce mt-4">SALE - 10% OFF</p>
      <Link
        href={`/products`}
        className="text-black rounded-full bg-pink-400 py-2 px-6 my-2 font-bold flex items-center hover:bg-pink-600 group hover:text-white"
      >
        Shop Now <BsArrowRight className="mx-2" />
      </Link>
    </main>
  );
};

export default HomeSection;
