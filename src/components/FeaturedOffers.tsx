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
    image: 'https://images.unsplash.com/photo-1576748872293-f4972ceda096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    storeImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Get the latest Smartphone X for only 200 Ksh! Limited stock available.',
  },
  {
    id: 2,
    type: 'service',
    name: 'Car Wash Deluxe',
    image: 'https://images.unsplash.com/photo-1514772145214-48bce0dff081?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    storeImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Each deluxe car wash service now at 900 Ksh! Avail the offer today.',
  },
  {
    id: 3,
    type: 'product',
    name: 'Ultra HD TV',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Upgrade your home entertainment with our Ultra HD TV at just 200 Ksh!',
  },
  {
    id: 4,
    type: 'service',
    name: 'Spa Relaxation Package',
    image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1594969155368-f19485a9d88c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Indulge in our spa relaxation package for only 900 Ksh. Limited slots available.',
  },
  {
    id: 5,
    type: 'product',
    name: 'Gaming Console Bundle',
    image: 'https://images.unsplash.com/photo-1555529669-26f9d103abdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1630381260512-e3fe55c11973?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Get a gaming console bundle for an exclusive price of 200 Ksh! Limited stock.',
  },
  {
    id: 6,
    type: 'service',
    name: 'Fitness Training Package',
    image: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Sign up for our fitness training package at a discounted rate of 900 Ksh!',
  },
  {
    id: 7,
    type: 'product',
    name: 'Designer Sunglasses',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Enhance your style with designer sunglasses at just 200 Ksh! Limited time offer.',
  },
  {
    id: 8,
    type: 'service',
    name: 'Weekend Getaway Package',
    image: 'https://images.unsplash.com/photo-1558191053-8edcb01e1da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1483181994834-aba9fd1e251a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Book a weekend getaway package for only 900 Ksh. Limited availability.',
  },
  {
    id: 9,
    type: 'product',
    name: 'Coffee Maker',
    image: 'https://images.unsplash.com/photo-1584957109774-c9b6d1ba9d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1485456780483-06106d602fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Brew your favorite coffee at home with our coffee maker for just 200 Ksh!',
  },
  {
    id: 10,
    type: 'service',
    name: 'Photography Session',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Capture special moments with a professional photography session at 900 Ksh!',
  },
  {
    id: 11,
    type: 'product',
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1576072446584-4955dfe17b86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Enjoy music on the go with a portable Bluetooth speaker for only 200 Ksh!',
  },
  {
    id: 12,
    type: 'service',
    name: 'Dining Experience for Two',
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Savor a romantic dining experience for two at a discounted rate of 900 Ksh!',
  },
  {
    id: 13,
    type: 'product',
    name: 'Wireless Charging Pad',
    image: 'https://images.unsplash.com/photo-1513884923967-4b182ef167ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1521566652839-697aa473761a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Charge your devices wirelessly with our charging pad for just 200 Ksh!',
  },
  {
    id: 14,
    type: 'service',
    name: 'Language Learning Course',
    image: 'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    description: 'Start your language learning journey with our course at a special price of 900 Ksh!',
  },
  {
    id: 15,
    type: 'product',
    name: 'Robot Vacuum Cleaner',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/97d03b12-e52b-43aa-b81a-aedb3db8744d.png',
    description: 'Keep your home clean effortlessly with a robot vacuum cleaner for 200 Ksh!',
  },
  {
    id: 16,
    type: 'service',
    name: 'Digital Marketing Consultation',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/7e4066fa-62dd-4249-868a-c3933358eda8.png',
    description: 'Boost your business with a digital marketing consultation at 900 Ksh!',
  },
  {
    id: 17,
    type: 'product',
    name: 'Men\'s Grooming Kit',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png',
    description: 'Upgrade your grooming routine with our men\'s grooming kit for 200 Ksh!',
  },
  {
    id: 18,
    type: 'service',
    name: 'Online Cooking Class',
    image: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    storeImage: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    description: 'Master the art of cooking with our online cooking class at 900 Ksh!',
  },
  {
    id: 19,
    type: 'product',
    name: 'Outdoor Camping Tent',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    storeImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    description: 'Plan your next adventure with our outdoor camping tent for just 200 Ksh!',
  },
  {
    id: 20,
    type: 'service',
    name: 'Virtual Fitness Training',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    storeImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
    description: 'Stay fit from the comfort of your home with virtual fitness training at 900 Ksh!',
  },
];


const FeaturedOffers = () => {
  return (
    <div className='w-full px-[5%] flex flex-col bg-gray-50 mb-[2%]'>
      <p className="text-black font-semibold text-[24px]">
        Featured Products & Services | 2024
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {featuredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-md p-4 shadow-md">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover mb-2"
                style={{ filter: 'brightness(80%) blur(1px)' }}
              />
              <div className="absolute inset-0 flex items-center p-2">
                <img
                  src={item.storeImage}
                  alt={`${item.name} Store`}
                  className="w-[25%] rounded-md shadow-md"
                />
              </div>
            </div>
            <p className="text-black font-semibold mb-2">{item.name}</p>
            <p className="text-[14px] text-primary">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOffers;
