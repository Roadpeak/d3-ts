import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface BlogPost {
    title: string;
    imageUrl: string;
    date: string;
    time: string;
}

const blogPosts: BlogPost[] = [
    {
        title: 'How to Save Big with Coupons',
        imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
        date: 'April 1, 2024',
        time: '10:00 AM',
    },
    {
        title: 'Unlocking Discounts: A Guide to Coupon Redemption',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
        date: 'April 2, 2024',
        time: '11:30 AM',
    },
    {
        title: 'Maximizing Savings: Tips for Coupon Enthusiasts',
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
        date: 'April 3, 2024',
        time: '1:00 PM',
    },
];

const Blog: React.FC = () => {
    return (
        <div className="py-4 px-[5%] bg-gray-100">
            <div className="flex w-full justify-center items-center ">
                <p className="text-center capitalize font-medium text-center text-[28px] text-gray-800 py-4">
                    Latest News
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-4">
                {blogPosts.map((post, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img className="w-full h-40 object-cover object-center" src={post.imageUrl} alt={post.title} />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                            <p className="text-sm text-gray-600">{post.date}, {post.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;
