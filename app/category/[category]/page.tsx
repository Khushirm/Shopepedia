import Image from "next/image";
import Link from "next/link";

interface CategoryType  {
  _id: string;
  name: string;
  images: string[];
  price: number;
};

const Category = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const res = await fetch(
    `https://ecomm-store-api.vercel.app/products/category/${category}`
  );
  const { data: categoryData }: { data: CategoryType[] } = await res.json();
  console.log(categoryData);
  return (
    <>
      <section className="my-20 bg-purple-400 ">
        <h1 className="py-4 text-center text-xl font-bold text-white">
          Welcome, to our store.
        </h1>
        <div className="flex flex-wrap justify-center">
          {categoryData?.map((data) => {
            return (
              <div className="w-full sm:w-1/3 p-4" key={data._id}>
                <Link
                  href={`/product/${data._id}`}
                  className="block mb-8 py-2 rounded-3xl mx-4 bg-white"
                >
                  <p className="font-bold text-red-950 text-center truncate ml-2 text-2xl mb-5">
                    {data.name}
                  </p>
                  <div className="max-h-74 object-contain flex justify-center p-8 w-[320px] h-[340px]">
                    <Image
                      src={data.images[0]}
                      alt={data.name}
                      width={150}
                      height={90}
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    />
                  </div>
                  <div className="ml-4 font-semibold text-gray-700">
                    <p className="font-semibold text-lg text-green-400 animate-pulse">
                      ${data.price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Category;
