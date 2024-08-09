import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const FundPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-4 mx-auto py-12 max-w-screen-lg">
                <p className="text-[24px] font-semibold text-center mb-8">Investment Opportunities</p>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Why Invest in Us</p>
                    <p className="text-lg text-gray-700">
                        At DISCOUN3, we are on a mission to revolutionize service accessibility with our innovative platform. By investing in us, you become part of a dynamic team committed to transforming industries and creating substantial value. Our unique approach and rapid growth potential make us an exciting investment opportunity.
                    </p>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Funding Goals</p>
                    <p className="text-lg text-gray-700">
                        We are seeking investment to accelerate our expansion and enhance our platform. Our funding goals include scaling our operations, investing in technology, and expanding our team. With your support, we aim to reach new markets and drive significant growth.
                    </p>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">How to Invest</p>
                    <p className="text-lg text-gray-700">
                        Interested in becoming an investor? Please contact us to discuss potential investment opportunities. We offer various investment options tailored to meet the needs of our partners.
                    </p>
                    <a href="mailto:info@discoun3ree.com" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        Contact Us
                    </a>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default FundPage;
