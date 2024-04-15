import React from 'react';

interface Service {
    title: string;
    description: string;
    image: string;
}

const services: Service[] = [
    {
        title: 'Electronics',
        description: 'Find great deals on electronics including smartphones, laptops, and accessories.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        title: 'Fashion',
        description: 'Discover the latest trends in fashion for men, women, and kids at unbeatable prices.',
        image: 'https://plus.unsplash.com/premium_photo-1683120929511-af05758ec1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        title: 'Home Decor',
        description: 'Upgrade your living space with our wide selection of home decor items.',
        image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        title: 'Beauty & Personal Care',
        description: 'Pamper yourself with our range of beauty and personal care products.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        title: 'Sports & Fitness',
        description: 'Stay active and fit with our range of sports equipment and fitness gear.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        title: 'Toys & Games',
        description: 'Entertain the whole family with our collection of toys and games for all ages.',
        image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlcnZpY2VzfGVufDB8fDB8fHww',
    },
];

const Services: React.FC = () => {
    return (
        <div className='py-4 px-[5%] bg-gray-100'>
            <p className="text-center capitalize font-medium text-[28px] text-gray-800 py-3">
                What we offer
            </p>
            <p className="text-gray-600 text-center pb-4 ">
                Services and features vary by location. Some features listed here may not be available to you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-4">
                {services.map(service => (
                    <div key={service.title} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg">
                        <div className="p-5">
                            <h2 className="text-[28px] font-semibold text-gray-700">{service.title}</h2>
                            <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                        </div>
                        <div className="w-full flex justify-end">
                            <img className="w-[30%] object-cover object-center" src={service.image} alt={service.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
