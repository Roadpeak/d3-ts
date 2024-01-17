import React from 'react';

interface FeaturedItem {
  id: number;
  type: 'product' | 'service';
  name: string;
  image: string;
  storeImage: string;
  description: string;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    type: 'product',
    name: 'Smartphone X',
    image: 'smartphone-x.jpg',
    storeImage: 'soko-supermarket.jpg',
    description: 'Get the latest Smartphone X for only 200 Ksh! Limited stock available.',
  },
  {
    id: 2,
    type: 'service',
    name: 'Car Wash Deluxe',
    image: 'car-wash-deluxe.jpg',
    storeImage: 'quick-mart.jpg',
    description: 'Each deluxe car wash service now at 900 Ksh! Avail the offer today.',
  },
  {
    id: 3,
    type: 'product',
    name: 'Ultra HD TV',
    image: 'ultra-hd-tv.jpg',
    storeImage: 'tuskys.jpg',
    description: 'Upgrade your home entertainment with our Ultra HD TV at just 200 Ksh!',
  },
  {
    id: 4,
    type: 'service',
    name: 'Spa Relaxation Package',
    image: 'spa-relaxation.jpg',
    storeImage: 'choppies.jpg',
    description: 'Indulge in our spa relaxation package for only 900 Ksh. Limited slots available.',
  },
  {
    id: 5,
    type: 'product',
    name: 'Gaming Console Bundle',
    image: 'gaming-console-bundle.jpg',
    storeImage: 'naivas.jpg',
    description: 'Get a gaming console bundle for an exclusive price of 200 Ksh! Limited stock.',
  },
  {
    id: 6,
    type: 'service',
    name: 'Fitness Training Package',
    image: 'fitness-training-package.jpg',
    storeImage: 'uchumi.jpg',
    description: 'Sign up for our fitness training package at a discounted rate of 900 Ksh!',
  },
  {
    id: 7,
    type: 'product',
    name: 'Designer Sunglasses',
    image: 'designer-sunglasses.jpg',
    storeImage: 'carrefour.jpg',
    description: 'Enhance your style with designer sunglasses at just 200 Ksh! Limited time offer.',
  },
  {
    id: 8,
    type: 'service',
    name: 'Weekend Getaway Package',
    image: 'weekend-getaway-package.jpg',
    storeImage: 'game-stores.jpg',
    description: 'Book a weekend getaway package for only 900 Ksh. Limited availability.',
  },
  {
    id: 9,
    type: 'product',
    name: 'Coffee Maker',
    image: 'coffee-maker.jpg',
    storeImage: 'sarit-centre.jpg',
    description: 'Brew your favorite coffee at home with our coffee maker for just 200 Ksh!',
  },
  {
    id: 10,
    type: 'service',
    name: 'Photography Session',
    image: 'photography-session.jpg',
    storeImage: 'two-rivers-mall.jpg',
    description: 'Capture special moments with a professional photography session at 900 Ksh!',
  },
  {
    id: 11,
    type: 'product',
    name: 'Portable Bluetooth Speaker',
    image: 'portable-bluetooth-speaker.jpg',
    storeImage: 'garden-city-mall.jpg',
    description: 'Enjoy music on the go with a portable Bluetooth speaker for only 200 Ksh!',
  },
  {
    id: 12,
    type: 'service',
    name: 'Dining Experience for Two',
    image: 'dining-experience.jpg',
    storeImage: 'westgate-mall.jpg',
    description: 'Savor a romantic dining experience for two at a discounted rate of 900 Ksh!',
  },
  {
    id: 13,
    type: 'product',
    name: 'Wireless Charging Pad',
    image: 'wireless-charging-pad.jpg',
    storeImage: 'hub-karen.jpg',
    description: 'Charge your devices wirelessly with our charging pad for just 200 Ksh!',
  },
  {
    id: 14,
    type: 'service',
    name: 'Language Learning Course',
    image: 'language-learning-course.jpg',
    storeImage: 'trm.jpg',
    description: 'Start your language learning journey with our course at a special price of 900 Ksh!',
  },
  {
    id: 15,
    type: 'product',
    name: 'Robot Vacuum Cleaner',
    image: 'robot-vacuum-cleaner.jpg',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/97d03b12-e52b-43aa-b81a-aedb3db8744d.png',
    description: 'Keep your home clean effortlessly with a robot vacuum cleaner for 200 Ksh!',
  },
  {
    id: 16,
    type: 'service',
    name: 'Digital Marketing Consultation',
    image: 'digital-marketing-consultation.jpg',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/7e4066fa-62dd-4249-868a-c3933358eda8.png',
    description: 'Boost your business with a digital marketing consultation at 900 Ksh!',
  },
  {
    id: 17,
    type: 'product',
    name: 'Men\'s Grooming Kit',
    image: 'mens-grooming-kit.jpg',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png',
    description: 'Upgrade your grooming routine with our men\'s grooming kit for 200 Ksh!',
  },
  {
    id: 18,
    type: 'service',
    name: 'Online Cooking Class',
    image: 'online-cooking-class.jpg',
    storeImage: 'two-rivers-mall.jpg',
    description: 'Master the art of cooking with our online cooking class at 900 Ksh!',
  },
  {
    id: 19,
    type: 'product',
    name: 'Outdoor Camping Tent',
    image: 'outdoor-camping-tent.jpg',
    storeImage: 'garden-city-mall.jpg',
    description: 'Plan your next adventure with our outdoor camping tent for just 200 Ksh!',
  },
  {
    id: 20,
    type: 'service',
    name: 'Virtual Fitness Training',
    image: 'virtual-fitness-training.jpg',
    storeImage: 'carrefour.jpg',
    description: 'Stay fit from the comfort of your home with virtual fitness training at 900 Ksh!',
  },
];


const FeaturedOffers = () => {
  return (
    <div className='w-full px-[5%] flex flex-col bg-gray-50'>
      <p className="text-black font-semibold text-[24px]">
        Featured Products & Services | 2024
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {featuredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-2"
            />
            <div className="flex items-center mb-2">
              <img
                src={item.storeImage}
                alt={`${item.name} Store`}
                className="w-6 h-6 rounded-full mr-2"
              />
              <p className="text-gray-500">{item.name}</p>
            </div>
            <p className="text-black font-semibold mb-2">{item.name}</p>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOffers;
