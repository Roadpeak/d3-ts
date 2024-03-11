import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions for Discoun3</h1>
          <div className="bg-white shadow-md p-8 rounded-lg">
            <p className="mb-6 text-gray-700">
              These Terms and Conditions govern your use of the coupon platform Discoun3 provided by foolu/discoun3. By accessing or using the Platform, you agree to abide by these Terms. Please read these Terms carefully before using the Platform. If you do not agree to these Terms, you should not use the Platform.
            </p>

            <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-700">
              By using the Platform, you acknowledge and agree to be bound by these Terms. We reserve the right to modify these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for changes.
            </p>

            <h2 className="text-xl font-bold mb-4">2. Use of the Platform</h2>
            <p className="mb-4 text-gray-700">
              a. Eligibility: You must be at least 15 years old to use the Platform. If you are accessing the Platform on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
            </p>
            <p className="mb-4 text-gray-700">
              b. Account Registration: To access certain features of the Platform, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <p className="mb-6 text-gray-700">
              c. Coupon Usage: You may use the coupons provided on the Platform in accordance with the terms and conditions specified by the respective coupon provider. We are not responsible for the availability, validity, or terms of any coupons listed on the Platform. On coupon purchase, you are required to redeem the coupon before its expiry date for once the coupon expires without being redeemed, neither Discoun3 nor the service provider shall be liable for the occurrence and so no refunds nor complaints shall be accepted.
            </p>

            <h2 className="text-xl font-bold mb-4">3. User Content</h2>
            <p className="mb-4 text-gray-700">
              a. Submission of User Content: You may submit content, including but not limited to reviews, comments, and ratings, to the Platform. By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
            </p>
            <p className="mb-6 text-gray-700">
              b. Prohibited Content: You agree not to submit any User Content that is unlawful, defamatory, abusive, obscene, or otherwise objectionable. We reserve the right to remove or modify any User Content that violates these Terms.
            </p>

            <h2 className="text-xl font-bold mb-4">4. Privacy</h2>
            <p className="mb-6 text-gray-700">
              Your use of the Platform is governed by our Privacy Policy, which can be found [link to Privacy Policy]. By using the Platform, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
            </p>

            <h2 className="text-xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="mb-4 text-gray-700">
              a. Ownership: All content and materials on the Platform, including but not limited to text, graphics, logos, and software, are the property of the Company or its licensors and are protected by intellectual property laws.
            </p>
            <p className="mb-6 text-gray-700">
              b. Limited License: You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes.
            </p>

            <h2 className="text-xl font-bold mb-4">6. Disclaimer of Warranties</h2>
            <p className="mb-4 text-gray-700">
              a. The Platform is provided on an "as-is" and "as-available" basis. We make no warranties or representations regarding the accuracy, completeness, or reliability of the Platform.
            </p>
            <p className="mb-6 text-gray-700">
              b. We do not endorse or guarantee the quality, safety, or legality of any products or services offered by third parties through coupons on the Platform.
            </p>

            <h2 className="text-xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="mb-6 text-gray-700">
              To the extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Platform.
            </p>

            <h2 className="text-xl font-bold mb-4">8. Termination</h2>
            <p className="mb-6 text-gray-700">
              We reserve the right to terminate or suspend your access to the Platform, with or without notice, for any reason, including but not limited to a violation of these Terms.
            </p>

            <h2 className="text-xl font-bold mb-4">9. Governing Law</h2>
            <p className="mb-6 text-gray-700">
              These Terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Kenya.
            </p>

            <h2 className="text-xl font-bold mb-4">10. Contact Information</h2>
            <p className="mb-6 text-gray-700">
              If you have any questions or concerns about these Terms, please contact us at{" "}
              <a href="mailto:info@discount3.com" className="text-blue-500">info@discount3.com</a>.
            </p>

            <p className="mb-6 text-gray-700">
              By using the Platform, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditionsPage;
