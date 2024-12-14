import React from "react";
import workingimg from '../assets/workingimg.png'
import benefitimg from '../assets/benefitimg.png'
const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-[50px]" >
      {/* Blog Header */}
      <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
        Smart Agriculture Blogs
      </h1>

      <div className="max-w-3xl mx-auto"> {/* Fixed width for large screens */}
        {/* Blog Post 1: How it All Works */}
        <div className="bg-white shadow-md rounded-lg mb-10">
          <div className="relative w-full h-64">
            <img
              src={workingimg} // Replace with your blog image URL
              alt="How it Works"
              className="absolute inset-0 h-full mx-auto w-auto object-cover rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              How It All Works
            </h2>
            <p className="text-gray-700 mb-4">
              In this project, we assemble all the hardware components in the
              farm, setting up sensors, irrigation systems, and other equipment
              needed for smart farming. These devices are connected through the
              Internet of Things (IoT), enabling remote control of the farm
              equipment through a user-friendly website.
            </p>
            <p className="text-gray-700 mb-4">
              Once the hardware is set up, you can easily monitor and control
              various devices such as irrigation systems, temperature sensors, and
              more, directly from the website. This gives you the freedom to
              manage your farm from anywhere in the world, making it convenient and
              efficient.
            </p>
            <p className="text-gray-700">
              The integration of IoT with our website provides a seamless
              experience, allowing users to interact with their farm remotely,
              ensuring a smarter and more sustainable agricultural operation.
            </p>
          </div>
        </div>

        {/* Blog Post 2: Benefits of Smart Agriculture */}
        <div className="bg-white shadow-md rounded-lg mb-10">
          <div className="relative w-full h-64">
            <img
              src={benefitimg} // Replace with your blog image URL
              alt="Benefits of Smart Agriculture"
              className="absolute inset-0 h-full mx-auto w-auto object-cover rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Benefits of Smart Agriculture
            </h2>
            <p className="text-gray-700 mb-4">
              Smart Agriculture leverages advanced technologies like IoT, sensors,
              and automation to improve the efficiency, productivity, and
              sustainability of farming operations. By using these technologies,
              farmers can optimize resource usage, reduce waste, and increase crop
              yields.
            </p>
            <p className="text-gray-700 mb-4">
              With the help of data-driven insights, farmers can make informed
              decisions about irrigation, fertilization, and crop management,
              ensuring healthier crops and better profits. Moreover, remote
              monitoring allows farmers to keep an eye on their fields, even when
              they are far away, saving time and reducing manual labor.
            </p>
            <p className="text-gray-700">
              Smart agriculture is the future of farming, and it empowers
              individuals and communities to grow food sustainably and efficiently
              while maximizing profits and reducing environmental impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
