import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Personal Information</h2>
        <p>
          We collect basic personal details such as your name, email, phone number, and shipping address for processing your orders and providing customer support.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
        <p>
          Your information is used strictly for order fulfillment, marketing updates (if subscribed), and improving your shopping experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
        <p>
          We follow standard industry practices to ensure your data is secure. We do not share or sell your information to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Contact</h2>
        <p>
          For any privacy-related concerns, reach out to us at <strong>support@clayjewelz.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
