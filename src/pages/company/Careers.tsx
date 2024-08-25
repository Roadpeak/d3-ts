import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const CareersPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-[5%] w-full mx-auto py-12">
                <h1 className="text-[24px] font-semibold text-center mb-8">Join Our Dynamic Team</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-700">
                        We are a forward-thinking startup on a mission to revolutionize the way people access services. By partnering with top service providers, we bring exclusive discounts to our users, making their lives more affordable and convenient. Currently, our team consists of passionate individuals dedicated to making a positive impact on the world.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Join Our Growing Team</h2>
                    {/* <p className="text-lg text-gray-700">
                        While we are not currently hiring, we are excited about the future and are eager to build a huge, talented team as we grow. We are focused on increasing revenue and seeking investment to drive our mission forward. If you are a creative and motivated individual who wants to be part of a dynamic team, we encourage you to stay connected.
                    </p> */}
                    <p className="">
                        We are hiring upto 150 new part time and full time employees on different job categories. Get to work remotely or in our office after submitting your application. Submit application below to get started!                    
                    </p>
                    <a className='text-primary text-[20px] font-semibold' href="/company/careers/opportunities">See open roles</a>
                    <p className="text-lg mt-4">
                        If you're passionate about innovation and eager to make a difference, we would love to hear from you as we prepare for future opportunities!
                    </p>
                    {/* <a href="#application-form" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        Get In Touch
                    </a> */}
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Competitive Salary</h3>
                            <p className="text-lg text-gray-700">We offer competitive salaries and performance-based bonuses to recognize and reward your hard work.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                            <p className="text-lg text-gray-700">As a rapidly growing company, there are ample opportunities for career advancement and professional development.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Work Schedule</h3>
                            <p className="text-lg text-gray-700">We value work-life balance and offer flexible work arrangements to accommodate your needs.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Dynamic Team Environment</h3>
                            <p className="text-lg text-gray-700">Join a diverse and collaborative team of talented individuals who are passionate about making a difference.</p>
                        </div>
                    </div>
                </section>

                <section id="application-form" className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
                    <p className="text-lg text-gray-700">
                        Ready to take the next step in your career? While we may not have immediate openings, we encourage you to reach out and connect with us. Fill out the form below to express your interest and stay updated on future opportunities.
                    </p>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default CareersPage;
