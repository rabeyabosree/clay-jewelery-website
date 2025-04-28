import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Product Disclaimer</h2>
        <p>
          All our clay jewelry pieces are handcrafted and may slightly vary in color, texture, and size. These imperfections make each item unique and should not be considered defects.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Usage & Care</h2>
        <p>
          Please handle your jewelry with care. Avoid contact with water, perfume, or chemicals. Store in a dry place and avoid dropping as clay pieces may break or crack.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Return & Refund Policy</h2>
        <p>
          Due to the handmade nature of our products, we do not accept returns unless the item is damaged during delivery. In such cases, please contact us within 48 hours with a photo of the item.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Order Cancellation</h2>
        <p>
          Orders can be cancelled within 24 hours of placement. After that, we begin production and cancellation is no longer possible.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Shipping & Delivery</h2>
        <p>
          We ship pan-India within 5-10 working days. Delivery time may vary depending on your location. We are not responsible for delays caused by courier services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          All designs, images, and content on our website are the intellectual property of our brand and cannot be reused or copied without permission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>
          For any questions or concerns regarding these terms, please contact us at <strong>support@clayjewelz.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
