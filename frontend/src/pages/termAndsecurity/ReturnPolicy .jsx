import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Return & Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Returns</h2>
        <p>
          Since our jewelry is handcrafted, we only accept returns for items damaged during delivery. Please report within 48 hours of receiving your order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p>
          To be eligible for a return, the item must be unused, in its original packaging, and include a photo proof of damage.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Refund Process</h2>
        <p>
          Once your return is approved, the refund will be processed to your original payment method within 5-7 business days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Contact</h2>
        <p>
          To initiate a return, email us at <strong>returns@clayjewelz.com</strong> with your order ID and issue description.
        </p>
      </section>
    </div>
  );
};

export default ReturnPolicy;
