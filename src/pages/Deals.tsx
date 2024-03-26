import React, { useEffect, useState } from 'react'
import FeaturedOffers from '../components/FeaturedOffers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  storeName: string;
  image: string;
  initialPrice: number;
  discount: number;
}

interface Store {
  _id: string;
  name: string;
  owner: {
    username: string;
  };
  followers: string[];
  imageUrl: string;
  location: string;
}

interface Discount {
  _id: string;
  name: string;
  initialPrice: number;
  discount: number;
  expiryDate: string;
  category: string;
  store: Store;
  serviceTime: string;
  description: string;
  imageUrl: string;
  priceAfterDiscount: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Eco-Friendly Handwoven Basket',
    storeName: 'Maasai Crafts Emporium',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    initialPrice: 1200,
    discount: 15,
  }
];

const Deals: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/discounts`);
        setDiscounts(response.data.discounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        setLoading(false);
      }
    };

    fetchDiscountsByShop();
  }, []);

  return (
    <div>
        <Navbar />
        <div className="w-full flex flex-col px-[5%] ">
            <p className="pt-4 pb-2 text-[17px] md:text-[24px] font-medium">
                Enter a world of discounts on everything
            </p>
            <div className="w-full mb-4 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 lg:grid-cols-6">
                {discounts.map((discount) => (
                  <Link to={`/products/${discount._id}/see-details`} key={discount._id} className="border flex flex-col bg-gray-50 justify-between rounded-md p-4">
                    <img src={discount.imageUrl} alt={discount.name} className="w-full object-cover rounded-md" />
                <div className="flex flex-col">
                      <p className="text-[14px] text-gray-500">{discount?.store.name}</p>
                      <p className="text-[17px] font-medium">{discount.name}</p>
                    <div className="flex items-center">
                        <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${discount.initialPrice.toLocaleString("KES")}`}</p>
                        <p className="text-primary font-medium text-[14px] ml-2">
                          {`Ksh. ${discount.priceAfterDiscount.toLocaleString("KES")}`}
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
