import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import discountImage from './discount-image.jpg';

const About: React.FC = () => {
  return (
   <>
   <Navbar />
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1665686374221-1901faa9f3ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhcHB5fGVufDB8fDB8fHww" alt="Discount" className="w-full rounded-lg shadow-md" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Experience Smart Savings with Discoun3</h2>
            </div>
          </div>
          <div>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to Discoun3, your ultimate destination for incredible discounts from a diverse array of service outlets across various industries! At Discoun3, we understand the joy of saving money while indulging in your favorite services, and we've made it our mission to bring you unbeatable deals that cater to your unique preferences.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Who we are</h2>
            <p className="text-lg text-gray-700 mb-6">
              Discoun3 is a leading online discount store that connects savvy shoppers with their preferred service outlets, be it restaurants, salons, fitness centers, entertainment venues, or any other service industry. Our platform is designed with one goal in mind: to make quality services more affordable and accessible to everyone.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-700 mb-6">
            Discover a treasure trove of discounts and special offers from a wide range of service providers. Whether you're looking for a gourmet dining experience, a relaxing spa day, an adventurous outdoor activity, or anything in between, Discoun3 has got you covered. Our user-friendly website and mobile app allow you to browse through an extensive selection of deals, ensuring you find the perfect offer tailored to your interests.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help Shoppers</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
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
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Empower Service Providers</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
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
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Discoun3, we believe in the power of great experiences and smart savings. Whether you're a discerning shopper or a service provider aiming to expand your clientele, we invite you to join our vibrant community. Embrace a world of discounts, seamless bookings, and thriving businesses with us.
          </p>
          <p className="italic text-lg text-gray-500">
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
