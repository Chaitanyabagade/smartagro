import React from "react";
import homeimg from "../assets/DigitalAgrri.jpg";

const Home = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div
        style={{
          backgroundImage: `url(${homeimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh", // Full viewport height
        }}
        className="relative flex items-center justify-center mt-[50px] bg-gray-800"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 md:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Transforming Agriculture with Smart Technology
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Monitor, control, and optimize your farm operations with real-time data, advanced sensors, and remote equipment management.
          </p>
          <a
            href="#features"
            className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg sm:text-xl hover:bg-green-700 transition-all duration-300 ease-in-out"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-12">
            Key Features of Our Smart Agriculture System
          </h2>

          {/* Features Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Real-Time Monitoring</h3>
              <p className="text-lg text-gray-700">
                Get up-to-date data on soil conditions, temperature, humidity, and more through sensors placed across your farm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Remote Equipment Control</h3>
              <p className="text-lg text-gray-700">
                Control irrigation systems, climate controls, and other farm equipment directly from your device for optimal performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Farm Data Visualization</h3>
              <p className="text-lg text-gray-700">
                Visualize all farm data in clear, easy-to-understand graphical formats for smarter decision-making and planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Revolutionize Your Farm?</h2>
        <p className="text-lg sm:text-xl mb-6">
          Join the future of agriculture. Our technology will help you optimize productivity, reduce waste, and increase profitability.
        </p>
        <a
          href="#contact"
          className="bg-white text-green-600 py-3 px-8 rounded-lg text-lg sm:text-xl hover:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          Contact Us Today
        </a>
      </section>
    </>
  );
};

export default Home;
