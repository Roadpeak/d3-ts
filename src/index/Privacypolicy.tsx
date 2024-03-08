import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="px-[5%] mx-auto bg-gray-100 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Last Updated: 24/1/2024</p>

        <div className="bg-white shadow-md p-8 rounded-lg">
          <p className="mb-6">
            Discoun3 is committed to protecting the privacy of its users. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your personal information when you access or use our coupon
            platform. By using the Platform, you consent to the practices
            described in this Privacy Policy.
          </p>

          <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            a. Information You Provide: When you use the Platform, you may
            voluntarily provide us with information such as your name, email
            address, and other contact information.
          </p>
          <p className="mb-4">
            b. User Content: We collect the content you submit to the Platform,
            including reviews, comments, and ratings.
          </p>
          <p className="mb-4">
            c. Automatically Collected Information: We may automatically collect
            information about your device, browser, IP address, and usage
            patterns when you access the Platform.
          </p>
          <p className="mb-6">
            d. Cookies: We use cookies and similar technologies to collect
            information and enhance your experience on the Platform. You can
            control the use of cookies through your browser settings.
          </p>

          <h2 className="text-xl font-bold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            a. Provide and Improve Services: We use your information to operate,
            maintain, and improve the Platform, including providing you with
            coupons and offers.
          </p>
          <p className="mb-4">
            b. Communications: We may use your contact information to send you
            notifications, updates, and marketing communications, subject to
            your preferences.
          </p>
          <p className="mb-4">
            c. User Content: User-generated content, such as reviews and
            ratings, may be displayed on the Platform, and associated
            information may be used for analytics and promotional purposes.
          </p>
          <p className="mb-6">
            d. Legal Compliance: We may use your information to comply with
            legal obligations and respond to requests from law enforcement and
            regulatory authorities.
          </p>

          <h2 className="text-xl font-bold mb-4">3. Information Sharing</h2>
          <p className="mb-4">We may share your information with:</p>
          <p className="mb-4">
            a. Third-Party Providers: We may use third-party service providers
            to help us operate the Platform and may share your information with
            them for that purpose.
          </p>
          <p className="mb-4">
            b. Business Transfers: In the event of a merger, acquisition, or
            sale of all or a portion of our assets, your information may be
            transferred to the acquiring entity.
          </p>
          <p className="mb-6">
            c. Legal Requirements: We may disclose your information if required
            by law or to protect our rights, privacy, safety, or property, as
            well as that of our users and the public.
          </p>

          <h2 className="text-xl font-bold mb-4">4. Your Choices</h2>
          <p className="mb-4">
            a. Account Information: You can review and update your account
            information by logging into your account settings.
          </p>
          <p className="mb-6">
            b. Marketing Communications: You can opt out of receiving marketing
            communications from us by following the unsubscribe instructions in
            those communications.
          </p>

          <h2 className="text-xl font-bold mb-4">5. Data Security</h2>
          <p className="mb-6">
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, and destruction.
            However, no data transmission or storage system can be guaranteed to
            be 100% secure.
          </p>

          <h2 className="text-xl font-bold mb-4">6. Children's Privacy</h2>
          <p className="mb-6">
            The Platform is not intended for individuals under the age of 15. We
            do not knowingly collect or maintain information from children under
            15.
          </p>

          <h2 className="text-xl font-bold mb-4">
            7. Changes to this Privacy Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy to reflect changes to our
            practices or for other operational, legal, or regulatory reasons. We
            will post the updated Privacy Policy on the Platform with a revised
            "Last Updated" date.
          </p>

          <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
          <p className="mb-6">
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at{" "}
            <a href="mailto:info@discoun3.com" className="text-blue-500">
              info@discoun3.com
            </a>
            .
          </p>

          <p className="mb-6">
            By using the Platform, you consent to the collection, use, and
            disclosure of your information as described in this Privacy Policy.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
