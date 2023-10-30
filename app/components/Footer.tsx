import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className='flex justify-around my-6 mx-3 lg:flex-row flex-col items-center lg:items-start'>
             <div className="mb-5 lg:mb-0flex flex-col items-center lg:items-start">
                <Image src={'/images/store.png'} width={70} height={70} alt="Ecomm" className="mb-2 mx-auto lg:mx-0" />
                <p className='w-80 text-justify'>Our store is your one-stop destination for a wide range of products, from fashion and electronics to home decor and lifestyle essentials. We curate a diverse selection of high-quality products, ensuring you find exactly what you're looking for. Your satisfaction is our top priority. We offer secure payment options. Explore the latest trends, find unique treasures, and embrace the convenience of online shopping like never before.</p>
            </div>
            <div className="mb-5 lg:mb-0 flex flex-col items-center lg:items-start">
                <p className='text-xl font-semibold mb-3'>Contact Us</p>
                <p className="mb-2 inline-block">Address: 45/2-A Lajpat Nagar,Noida,India</p>
                <p><Link href={"mailto:contact@ecomm.com"} className="my-2 inline-block hover:text-green-500">Email: service@ecomm.com</Link></p>
                <p><Link href={"tel:9234566120"} className="my-2 inline-block hover:text-green-500">Phone: 9234566120</Link></p>
            </div>
        </div>
    )
}

export default Footer