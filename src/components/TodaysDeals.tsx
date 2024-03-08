import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

interface Deal {
  id: number;
  image: string;
  title: string;
  description: string;
}

const todayDeals: Deal[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1584957109774-c9b6d1ba9d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Electronics Bonanza',
    description: 'Grab the latest electronics at unbeatable prices today!',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483181994834-aba9fd1e251a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Fashion Extravaganza',
    description: 'Upgrade your wardrobe with trendy fashion items at discounted rates.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Home Appliances Mega Sale',
    description: 'Revamp your home with top-notch appliances on a budget.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Groceries Super Saver',
    description: 'Shop for your daily essentials with exclusive discounts on groceries.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1630381260512-e3fe55c11973?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Mobile Phones Fiesta',
    description: 'Upgrade your smartphone with amazing deals on the latest models.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1555529669-26f9d103abdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Beauty Products Bonanza',
    description: 'Indulge in self-care with discounts on top beauty and skincare products.',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1594969155368-f19485a9d88c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Home Decor Delights',
    description: 'Enhance your living space with elegant home decor items at great prices.',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Book Lovers Special',
    description: 'Discover a world of knowledge with discounted prices on bestselling books.',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Sports Gear Blowout',
    description: 'Get active with unbeatable deals on high-quality sports and fitness gear.',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1584953528653-503bb1c9dbf8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHNob3BwaW5nfGVufDB8fDB8fHww',
    title: 'Kitchen Appliances Fiesta',
    description: 'Upgrade your kitchen with top-rated appliances at discounted rates.',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Toys & Games Extravaganza',
    description: 'Surprise your little ones with discounted toys and games they will love.',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1514772145214-48bce0dff081?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Travel Essentials Sale',
    description: 'Plan your next adventure with exclusive deals on travel essentials.',
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Fitness Equipment Blowout',
    description: 'Achieve your fitness goals with discounted prices on quality gym equipment.',
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1587802659513-7748a6e21f0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Jewelry Showcase',
    description: 'Add a touch of elegance to your look with exquisite jewelry at special prices.',
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1576748872293-f4972ceda096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Car Accessories Sale',
    description: 'Upgrade your ride with amazing deals on high-quality car accessories.',
  },
];

const TodaysDeals: React.FC = () => {
  return (
    <div className='w-full px-[5%] py-[2%] flex flex-col gap-[2%] '>
      <p className="text-black font-medium text-[24px]">
        Today's best deals
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayDeals.map((deal) => (
          <Link to={`/products/${deal.id}/see-details`} key={deal.id} className="bg-white gap-4 items-center rounded-md cursor-pointer hover:shadow-xl flex p-4 shadow-md">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-[25%] rounded-md object-cover mb-2"
            />
            <div className="w-full flex h-full items-center justify-between">
              <div className="flex flex-col">
                <p className="text-black font-semibold mb-2">{deal.title}</p>
                <p className="text-primary text-[13px]">{deal.description}</p>
              </div>
            <div className="h-full flex justify-end items-end text-end">
              <LiaExternalLinkAltSolid className="text-yellow-500" size={24} />
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;
