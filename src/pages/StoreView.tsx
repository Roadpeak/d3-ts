import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Product {
  id: number;
  title: string;
  storeName: string;
  image: string;
  initialPrice: number;
  discount: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Eco-Friendly Handwoven Basket',
    storeName: 'Maasai Crafts Emporium',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 1200,
    discount: 15,
  },
  {
    id: 2,
    title: 'Organic Kenyan Coffee Beans',
    storeName: 'Nairobi Coffee Hub',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 800,
    discount: 10,
  },
  {
    id: 3,
    title: 'Handcrafted Leather Sandals',
    storeName: 'Coastal Leather Works',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 1500,
    discount: 20,
  },
  {
    id: 4,
    title: 'Customized African Print Tote Bag',
    storeName: 'AfroChic Designs',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 1000,
    discount: 25,
  },
  {
    id: 5,
    title: 'Artisanal Soap Set',
    storeName: 'Kenyan Soaps & Scents',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 500,
    discount: 15,
  },
  {
    id: 6,
    title: 'Maasai Beaded Jewelry Set',
    storeName: 'Beads of Kenya',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 1800,
    discount: 10,
  },
  {
    id: 7,
    title: 'African Print Throw Pillow',
    storeName: 'AfriDecor Furnishings',
    image: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 600,
    discount: 12,
  },
  {
    id: 8,
    title: 'Kenyan Safari Photography Book',
    storeName: 'Wildlife Captures Publishing',
    image: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png',
    initialPrice: 1200,
    discount: 18,
  },
  {
    id: 9,
    title: 'Handwoven Kiondo Bag',
    storeName: 'Crafts by Kikuyu Artisans',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 1400,
    discount: 15,
  },
  {
    id: 10,
    title: 'Organic Honey from Mount Kenya',
    storeName: 'Beekeeper\'s Delight',
    image: 'https://d3itvsmwj0r86k.cloudfront.net/images/7e4066fa-62dd-4249-868a-c3933358eda8.png',
    initialPrice: 750,
    discount: 20,
  },
  {
    id: 11,
    title: 'Hand-Painted Ceramic Plate Set',
    storeName: 'Kiln Craft Pottery',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 2000,
    discount: 15,
  },
  {
    id: 12,
    title: 'African Inspired Fashion Mask',
    storeName: 'Nairobi Couture Masks',
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 350,
    discount: 10,
  },
  {
    id: 13,
    title: 'Maasai Mara Guided Safari',
    storeName: 'Safari Adventures Kenya',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 5000,
    discount: 15,
  },
  {
    id: 14,
    title: 'Kenyan Tea Sampler Pack',
    storeName: 'Tea Haven Kenya',
    image: 'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 800,
    discount: 12,
  },
  {
    id: 15,
    title: 'Hand-carved Soapstone Sculpture',
    storeName: 'Kisii Stone Creations',
    image: 'https://images.unsplash.com/photo-1513884923967-4b182ef167ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    initialPrice: 1200,
    discount: 20,
  },
];

const StoreView: React.FC = () => {
  return (
    <div className='w-full h-full scroll-smooth flex flex-col'>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full px-[5%] py-[2%] bg-white text-black gap-[2%]">
        <div className="w-full flex flex-col md:w-[20%] p-4">
          <img 
            src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3BwaW5nfGVufDB8fDB8fHww" 
            alt="Store Image"
            className="w-[40%] rounded-md justify-center mx-auto flex items-center" 
          />
          <p className="text-center text-[20px] font-medium py-2">
            The Hub <span className="text-gray-600"></span>
          </p>
          <div className="w-full flex gap-4 items-center">
            <button className="bg-primary rounded-md text-white font-medium w-full px-3 py-1.5">
              Start Shopping
            </button>
            <Link to={`/`} className="bg-secondary rounded-md text-black p-2 flex items-center justify-center">
              <FaExternalLinkAlt size={24} />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 font-medium">Phone <span className="">+254 113 794219</span></p>
            <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 font-medium">Email <span className="">hub@gmail.com</span></p>
            <p className="text-sm text-gray-800 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2 ">Stats <span className="">{products.length} discounts</span></p>
            <p className="text-sm text-gray-600 w-full flex items-center justify-between pb-1 border-b border-gray-300 mb-2">Stats <span className="">244 followers</span></p>
            <div className="w-full flex gap-4 items-center">
              <Link to={`/`} className="bg-secondary rounded-md text-black w-full p-2 flex items-center justify-center">
                Contact
              </Link>
              <button className="bg-primary rounded-md text-white font-medium w-full px-3 py-1.5">
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[80%] md:border md:p-4 rounded-md">
          <div className="flex items-center w-full mb-2 justify-between">
            <p className="capitalize text-gray-600 text-[20px] font-medium">
              all
            </p>
            <input 
              type="text" 
              className='border rounded-md px-2 outline-none focus:outline-none text-gray-500 py-1'
              placeholder='Search'
              // value={''}
            />
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 lg:grid-cols6">
            {products.map((product) => (
            <Link to={`/products/${product.id}/see-details`} key={product.id} className="shadow-md hover:shadow-xl hover:border flex flex-col justify-between rounded-md p-4">
              <img src={product.image} alt={product.title} className="w-full object-cover rounded-md" />
              <div className="flex flex-col">
                <p className="text-[14px] text-gray-500">{product.storeName}</p>
                <p className="text-[17px] font-medium">{product.title}</p>
                <div className="flex items-center">
                    <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${product.initialPrice.toLocaleString("KES")}`}</p>
                    <p className="text-primary font-medium text-[14px] ml-2">
                        {`Ksh. ${(product.initialPrice - (product.initialPrice * product.discount) / 100).toLocaleString("KES")}`}
                    </p>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreView;
