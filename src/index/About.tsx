import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const About: React.FC = () => {
  return (
   <>
   <Navbar />
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          About Our Company
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to Discoun3, your ultimate destination for incredible discounts from a diverse array of service outlets across various industries! At Discoun3, we understand the joy of saving money while indulging in your favorite services, and we've made it our mission to bring you unbeatable deals that cater to your unique preferences.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Who we are</h2>
        <p className="text-lg text-gray-700 mb-6">
          Discoun3 is a leading online discount store that connects savvy shoppers with their preferred service outlets, be it restaurants, salons, fitness centers, entertainment venues, or any other service industry. Our platform is designed with one goal in mind: to make quality services more affordable and accessible to everyone.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What We Offer:
        </h2>
        <div className="list-disc list-inside text-lg text-gray-700 mb-6 pl-4">
          <p>
            Discover a treasure trove of discounts and special offers from a wide range of service providers. Whether you're looking for a gourmet dining experience, a relaxing spa day, an adventurous outdoor activity, or anything in between, Discoun3 has got you covered. Our user-friendly website and mobile app allow you to browse through an extensive selection of deals, ensuring you find the perfect offer tailored to your interests.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How We Help Shoppers:
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 pl-4">
          <li>
            Unbeatable Discounts: We collaborate with top-notch service outlets to bring you exclusive discounts that you won't find anywhere else. Enjoy significant savings on your favorite services without compromising on quality.
          </li>
          <li>
            Convenient Booking: Easily book appointments or services directly through our platform. Say goodbye to lengthy phone calls and booking hassles – we streamline the process for you.
          </li>
          <li>
            Personalized Recommendations: Our intelligent recommendation system suggests deals based on your preferences, ensuring you never miss out on offers that align with your interests.
          </li>
          <li>
            Secure Transactions: Shop with confidence knowing that your payments are secure and your personal information is protected.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How We Empower Service Providers:
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 pl-4">
          <li>
            Increased Visibility: We provide service providers with a platform to showcase their offerings to a vast audience of potential customers. Enhance your online presence and attract more clients to grow your business.
          </li>
          <li>
            Boosted Bookings: Discoun3 helps service providers fill their schedules by connecting them with customers actively seeking their services. Maximize your bookings and optimize your business operations.
          </li>
          <li>
            Marketing Support: Our dedicated marketing initiatives amplify your brand's reach, ensuring that your services gain the attention they deserve.
          </li>
          <li>
            Feedback Loops: Receive valuable feedback from customers, enabling you to enhance your services based on real-time insights and customer preferences.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Team</h2>
        <div className="flex flex-col justify-center gap-4 ">
          <p className="text-center text-[14px] mt-4">
            At Discoun3, we believe in the power of great experiences and smart savings. Whether you're a discerning shopper or a service provider aiming to expand your clientele, we invite you to join our vibrant community. Embrace a world of discounts, seamless bookings, and thriving businesses with us.
          </p>
          <p className="italic text-center text-gray-400">
            Thank you for choosing Discoun3 – where incredible discounts meet exceptional services!
          </p>
        </div>
      </div>
    </div>
    <Footer />
   </>
  );
};

export default About;
