// CareersPage.tsx
import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const CareersPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-[5%] mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Join Our Dynamic Team</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-700">
                        We are a forward-thinking startup on a mission to revolutionize the way people access services. By partnering with top service providers, we bring exclusive discounts to our users, making their lives more affordable and convenient. Currently, our team consists of passionate individuals dedicated to making a positive impact on the world.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Join Our Growing Team</h2>
                    <p className="text-lg text-gray-700">
                        We are currently not hiring but keep an eye here, as we are looking forward to adding more creative individuals to our talented team.
                    </p>
                    <p className="text-lg mt-4">
                        If you're passionate about innovation and eager to make a difference, we'd love to hear from you!
                    </p>
                    <a href="#application-form" className="text-primary font-semibold hover:underline mt-6 inline-block">
                        Apply Now
                    </a>
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
                    <h2 className="text-2xl font-semibold mb-4">Apply Now</h2>
                    <p className="text-lg text-gray-700">
                        Ready to take the next step in your career? Fill out the form below to apply for one of our open positions.
                    </p>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default CareersPage;
