import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const BrandGuidelinesPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-4 mx-auto py-12 max-w-screen-lg">
                <p className="text-[24px] font-semibold text-center mb-8">Brand Guidelines</p>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Introduction</p>
                    <p className="text-lg text-gray-700">
                        Welcome to the DISCOUN3 brand guidelines. This document provides essential information on how to use our brand assets correctly. Adhering to these guidelines ensures consistency and integrity in representing our brand.
                    </p>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Logo Usage</p>
                    <p className="text-lg text-gray-700">
                        Our logo is a vital part of our brand identity. Use it with care and ensure it is displayed correctly in all applications. Avoid distorting or altering the logo, and maintain sufficient clear space around it.
                    </p>
                    <img src="https://via.placeholder.com/600x300" alt="DISCOUN3 Logo Examples" className="my-4 w-full max-w-md mx-auto" />
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Color Palette</p>
                    <p className="text-lg text-gray-700">
                        Our color palette includes primary and secondary colors that represent our brand. Use these colors consistently to maintain brand recognition. Refer to the color codes for accurate reproduction.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-32 h-32 bg-primary text-white text-center flex items-center justify-center">Primary Color</div>
                        <div className="w-32 h-32 bg-secondary text-white text-center flex items-center justify-center">Secondary Color</div>
                    </div>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Typography</p>
                    <p className="text-lg text-gray-700">
                        Our typography reflects the tone and voice of our brand. Use the specified fonts and sizes to ensure uniformity across all communications. Refer to the provided examples for correct usage.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default BrandGuidelinesPage;
