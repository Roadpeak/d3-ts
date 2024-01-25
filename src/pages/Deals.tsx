import React from 'react'
import FeaturedOffers from '../components/FeaturedOffers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

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

const Deals: React.FC = () => {
  return (
    <div>
        <Navbar />
        <div className="w-full flex flex-col px-[5%] ">
            <p className="pt-4 pb-2 text-[17px] md:text-[24px] font-medium">
                Enter a world of discounts on everything
            </p>
            <div className="w-full mb-4 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 lg:grid-cols-6">
                {products.map((product) => (
                <Link to={`/products/${product.id}/see-details`} key={product.id} className="border flex flex-col bg-gray-50 justify-between rounded-md p-4">
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
        <FeaturedOffers />
        <Footer />
    </div>
  )
}

export default Deals
