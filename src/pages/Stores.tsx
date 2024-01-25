import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface Store {
  id: number;
  name: string;
  image: string;
  number: number;
}


 const storeData: Store[] = [
    { id: 1, name: 'Soko Supermarket', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/d5461172-28eb-4717-b723-d0d87149347c.jpg', number: 5 },
    { id: 2, name: 'Quick Mart', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/7e4066fa-62dd-4249-868a-c3933358eda8.png', number: 12 },
    { id: 3, name: 'Tuskys', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/f50433c4-a4ea-49a7-a8b7-2e5ae1b40422.jpg', number: 8 },
    { id: 4, name: 'Choppies', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png', number: 15 },
    { id: 5, name: 'Naivas', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png', number: 10 },
    { id: 6, name: 'Uchumi', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/4692fc58-79d1-4412-9b60-c7a55186124a.png', number: 22 },
    { id: 7, name: 'Carrefour', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/46dc0e4d-7493-4ced-bfd7-31519e74e521.png', number: 18 },
    { id: 8, name: 'Game Stores', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/6baea3a1-7b84-4497-8fe7-d44b62b35af0.jpg', number: 30 },
    { id: 9, name: 'Sarit Centre', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/a8d77215-76f2-4523-9825-1eb54aee8cde.png', number: 7 },
    { id: 10, name: 'Two Rivers Mall', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/f6dced72-e9f9-4814-a9f3-5823c78ef22b.jpg', number: 14 },
    { id: 11, name: 'Garden City Mall', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/1615aa35-2ac6-4b31-ad73-7859bd59e9f0.jpg', number: 25 },
    { id: 12, name: 'Westgate Shopping Mall', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/edd6f28f-6c2b-472c-b106-df2d329e9fdf.jpg', number: 19 },
    { id: 13, name: 'Hub Karen', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/f70682ac-085f-43ba-aaa7-81e380a7db4a.jpg', number: 11 },
    { id: 14, name: 'TRM - Thika Road Mall', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/97d03b12-e52b-43aa-b81a-aedb3db8744d.png', number: 17 },
    { id: 15, name: 'Sarit Centre', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/e5fa0ab0-e8c0-4f69-9096-191a9a4d811a.jpg', number: 28 },
    { id: 32, name: 'Quick Mart', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/7e4066fa-62dd-4249-868a-c3933358eda8.png', number: 12 },
    { id: 43, name: 'Tuskys', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/f50433c4-a4ea-49a7-a8b7-2e5ae1b40422.jpg', number: 8 },
    { id: 49, name: 'Choppies', image: 'https://d3itvsmwj0r86k.cloudfront.net/images/6e900043-68fe-4184-9b72-28e8dc7e931e.png', number: 15 },
 ];


const Stores: React.FC = () => {
  return (
    <div className='flex flex-col w-full'>
        <Navbar />
         <div className="w-full flex flex-col px-[5%] py-[2%]">
            <div className="flex flex-col justify-center items-center text-center w-full ">
                <p className="text-[18px] md:text-[24px] font-medium text-center">
                    Stores with cashbacks, Coupon Codes & Promo Codes
                </p>
                <p className="text-[16px] font-light text-gray-700">
                    Get Extra 5% Bonus at over 1000 stores
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-7 gap-4 my-[2%]">
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1647221598270-e7a8716fef08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                fashion & clothing
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                Beauty
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1423666523292-b458da343f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                Cleaning
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1545535408-2b4d520cbd88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                photography
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1566997560041-002fd549180b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                videography
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                Tech
              </div>
              <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
                photo mount
              </div>
            </div>
            <p className="font-medium text-[18px] md:text-[25px]">
              Double Cash Back Event Featured Stores | Jan 2024
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-6 gap-4">
                {storeData.map((store) => (
                <Link to={`/stores/${store.id}/view`} key={store.id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
                    <img
                    src={store.image}
                    alt={store.name}
                    className="w-[30%] rounded-md object-cover mb-2"
                    />
                    <p className="text-black font-semibold">{store.name}</p>
                    <p className="text-gray-500">mostly <span className='text-primary'>{store.number}% OFF</span></p>
                </Link>
                ))}
            </div>
         </div>
        <Footer />      
    </div>
  )
}

export default Stores
