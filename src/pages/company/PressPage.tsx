import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const PressPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-4 mx-auto py-12 max-w-screen-lg">
                <p className="text-[24px] font-semibold text-center mb-8">Press & Media</p>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Press Releases</p>
                    <p className="text-lg text-gray-700">
                        Stay updated with our latest news and announcements. We regularly issue press releases about company milestones, product launches, and other important events.
                    </p>
                    <a href="/press-releases" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        View Press Releases
                    </a>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Media Kit</p>
                    <p className="text-lg text-gray-700">
                        Our media kit provides essential resources for journalists and media professionals. It includes high-resolution images, logo files, and company background information.
                    </p>
                    <a href="/media-kit" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        Download Media Kit
                    </a>
                </section>

                <section className="mb-12">
                    <p className="text-[20px] text-black font-medium mb-2">Contact Us</p>
                    <p className="text-lg text-gray-700">
                        For media inquiries, interviews, or additional information, please reach out to our press team.
                    </p>
                    <a href="mailto:info@discoun3ree.com" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        Contact Press Team
                    </a>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default PressPage;
