import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      {/* Contact Info */}
      <div className="mb-10 space-y-4 text-center">
        <p>📍 Address: 123 Handmade Street, Art City, India</p>
        <p>📧 Email: <a href="mailto:support@clayjewelz.com" className="text-blue-600">support@clayjewelz.com</a></p>
        <p>📞 Phone: +91 98765 43210</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-blue-500 hover:underline">Instagram</a>
          <a href="#" className="text-blue-500 hover:underline">Facebook</a>
          <a href="#" className="text-blue-500 hover:underline">WhatsApp</a>
        </div>
      </div>

      {/* Contact Form */}
      <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium">Message</label>
          <textarea
            rows="5"
            placeholder="Your message..."
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
