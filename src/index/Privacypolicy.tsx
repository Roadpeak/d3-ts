import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: January 24, 2024</p>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="mb-8 text-gray-700">
              Discoun3 is committed to protecting the privacy of its users. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you access or use our coupon platform. By using the Platform, you consent to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4 text-gray-700">
              a. <strong>Information You Provide:</strong> When you use the Platform, you may voluntarily provide us with information such as your name, email address, and other contact information.
            </p>
            <p className="mb-4 text-gray-700">
              b. <strong>User Content:</strong> We collect the content you submit to the Platform, including reviews, comments, and ratings.
            </p>
            <p className="mb-4 text-gray-700">
              c. <strong>Automatically Collected Information:</strong> We may automatically collect information about your device, browser, IP address, and usage patterns when you access the Platform.
            </p>
            <p className="mb-6 text-gray-700">
              d. <strong>Cookies:</strong> We use cookies and similar technologies to collect information and enhance your experience on the Platform. You can control the use of cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 text-gray-700">
              a. <strong>Provide and Improve Services:</strong> We use your information to operate, maintain, and improve the Platform, including providing you with coupons and offers.
            </p>
            <p className="mb-4 text-gray-700">
              b. <strong>Communications:</strong> We may use your contact information to send you notifications, updates, and marketing communications, subject to your preferences.
            </p>
            <p className="mb-4 text-gray-700">
              c. <strong>User Content:</strong> User-generated content, such as reviews and ratings, may be displayed on the Platform, and associated information may be used for analytics and promotional purposes.
            </p>
            <p className="mb-6 text-gray-700">
              d. <strong>Legal Compliance:</strong> We may use your information to comply with legal obligations and respond to requests from law enforcement and regulatory authorities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="mb-4 text-gray-700">We may share your information with:</p>
            <p className="mb-4 text-gray-700">
              a. <strong>Third-Party Providers:</strong> We may use third-party service providers to help us operate the Platform and may share your information with them for that purpose.
            </p>
            <p className="mb-4 text-gray-700">
              b. <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity.
            </p>
            <p className="mb-6 text-gray-700">
              c. <strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect our rights, privacy, safety, or property, as well as that of our users and the public.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Choices</h2>
            <p className="mb-4 text-gray-700">
              a. <strong>Account Information:</strong> You can review and update your account information by logging into your account settings.
            </p>
            <p className="mb-6 text-gray-700">
              b. <strong>Marketing Communications:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those communications.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="mb-6 text-gray-700">
              We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no data transmission or storage system can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Children's Privacy</h2>
            <p className="mb-6 text-gray-700">
              The Platform is not intended for individuals under the age of 15. We do not knowingly collect or maintain information from children under 15.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to this Privacy Policy</h2>
            <p className="mb-6 text-gray-700">
              We may update this Privacy Policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on the Platform with a revised "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="mb-6 text-gray-700">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:info@discoun3.com" className="text-blue-600 hover:underline">info@discoun3.com</a>.
            </p>

            <p className="mb-6 text-gray-700">
              By using the Platform, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
