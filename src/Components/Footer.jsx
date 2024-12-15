import React from "react";
import logo from "../assets/logo.png"; // Replace with your logo path

const Footer = () => {
  return (
    <footer className="bg-purple-500 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center">
        {/* Left Section: Logo */}
        <div className="mb-8 lg:mb-0 flex justify-center lg:justify-start">
          <img src={logo} alt="Smart Agriculture Logo" className="w-40 h-40 rounded-full" />
        </div>

        {/* Center Section: Mission and Description */}
        <div className="text-center lg:text-left px-4 mb-8 lg:mb-0">
          <h3 className="text-3xl font-bold mb-3">Innovating Agriculture for a Sustainable Future</h3>
          <p className="text-lg text-gray-200">
            We leverage cutting-edge technology to help farmers optimize their processes, boost productivity, and reduce environmental impact.
          </p>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex space-x-10 justify-center lg:justify-end mb-8 lg:mb-0 text-2xl">
          <a
            href="https://www.linkedin.com"
            className="hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://twitter.com"
            className="hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.facebook.com"
            className="hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.youtube.com"
            className="hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://www.whatsapp.com"
            className="hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section: Contact Info & Copyright */}
      <div className="border-t border-gray-200 mt-8 pt-4 text-center">
        <p className="text-lg">Phone: +123-456-7890 | Email: contact@smartagro.com</p>
        <p className="text-sm text-gray-400 mt-2">&copy; 2024 Smart Agro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
