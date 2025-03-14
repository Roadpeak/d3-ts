import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Vision: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-[5%] mx-auto py-12">
                <div className="flex flex-col md:flex-row w-full gap-8 mb-12 items-center bg-white p-6 rounded-lg">
                    <div className="flex w-full md:w-1/2">
                        <img className="h-full w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D" alt="Partnering with the Best" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Partnering with the Best</h2>
                        <p className="text-gray-700 mb-4">
                            To achieve our vision, we are committed to partnering with the biggest and most reputable service providers in every industry. From transportation and hospitality to healthcare and finance, we seek to collaborate with top-tier companies that share our passion for innovation and customer satisfaction. By joining forces with these industry leaders, we can leverage their expertise, resources, and networks to deliver unparalleled value to our customers.
                        </p>
                        <p className="text-gray-700">
                            We are looking forward to partnering with interested partners to take this to the next level.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-8 items-center bg-white p-6 rounded-lg  mb-12">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Going Global</h2>
                        <p className="text-gray-700 mb-4">
                            While we are currently based in Kenya, our sights are set on much broader horizons. Over the next five years, we plan to expand our operations to at least 20 countries across Africa, Asia, Europe, and beyond. This ambitious expansion will allow us to reach millions of new customers and establish DISCOUN3 as a household name on a global scale.
                        </p>
                    </div>
                    <div className="flex w-full md:w-1/2">
                        <img className="h-full w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xvYmFsfGVufDB8fDB8fHww" alt="Going Global" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg  mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Approach</h2>
                    <p className="text-gray-700 mb-4">
                        At DISCOUN3, we believe in taking a strategic and measured approach to growth. We are committed to building strong, lasting relationships with our partners and ensuring that our expansion efforts are sustainable and responsible. By focusing on quality over quantity and prioritizing the needs of our customers, we are confident that we can achieve our vision while staying true to our core values.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg ">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Us on Our Journey</h2>
                    <p className="text-gray-700 mb-4">
                        As we embark on this exciting journey towards global expansion, we invite you to join us every step of the way. Whether you're a potential partner, investor, or customer, there are countless opportunities to be part of our success story. Together, we can shape the future of service accessibility and make a positive impact on the lives of millions around the world.
                    </p>
                    <p className="text-gray-700">
                        We are looking forward to partnering with interested partners to take this to the next level.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Vision;
