import Image from "next/image";
import Link from "next/link";

interface Category{
  name:string;
  _id:string;
  image:string;
}

const Categories = async () => {
  const res = await fetch(
    "https://ecomm-store-api.vercel.app/products/categories"
  );
  const { data: categories }: {data:Category[]} = await res.json();
  return (
    <section className="flex flex-col items-center mt-12">
      <p className="text-5xl font-semibold mb-5 text-rose-600 ">"Delivering Dreams, One Click at a Time"</p>
      <div className="flex flex-wrap gap-x-4 gap-y-12 p-8 justify-center">
        {categories.map((category:Category) => {
          return (
            <Link
              href={`category/${category.name}`}
              key={category._id}
              className="inline-block w-56 h-48 relative group hover:scale-100 cursor-pointer"
            >
              <Image
                src={category.image}
                fill
                alt="CATEGORY"
                className="rounded-3xl opacity-70 border-2 border-white"
              />
              <p className="absolute bottom-12 left-2 capitalize font-bold text-xl group-hover:text-2xl">
                {category.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
