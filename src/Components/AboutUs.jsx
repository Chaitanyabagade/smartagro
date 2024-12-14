import React from 'react';
import smartfarming from "../assets/smartfarming.jpg"
import iotfarm from '../assets/iotfarmintg.jpg'
import dataanalitic from '../assets/dataanylitics.jpg'
import sensorsimg from '../assets/sensorimg.png'
import smartirrigation from '../assets/smartirrigation.png'
const AboutUs = () => {
    return (
        <div className="bg-gray-50 py-10 mt-[50px] ">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-green-700">About Us</h1>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                    Empowering farmers with smart agriculture solutions through IoT, automation, and sustainability-driven technologies.
                </p>
            </div>

            <div className="container mx-auto px-6 lg:px-12 space-y-12">
                {/* Section: Who We Are */}
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                        <img
                            src={smartfarming}
                            alt="Smart Farming"
                            className="rounded-xl w-full"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-semibold text-green-700 mb-4">Who We Are</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At Smart AgriTech, our mission is to integrate cutting-edge technology into traditional farming practices.
                            We provide innovative tools like IoT devices, smart irrigation systems, and data analytics to help farmers
                            enhance productivity, optimize resources, and ensure sustainable agricultural practices.
                        </p>
                    </div>
                </div>

                {/* Section: Our Vision */}
                <div className="bg-green-100 rounded-xl shadow-lg p-8 flex flex-col lg:flex-row-reverse items-center gap-8">
                    <div className="lg:w-1/2">
                        <img
                            src={iotfarm}
                            alt="IoT and Farming"
                            className="rounded-xl w-full"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We aim to build a future where agriculture is powered by intelligent IoT systems, enabling farmers to monitor and
                            control their crops remotely. By leveraging smart technologies, we envision a sustainable, productive, and eco-friendly
                            agricultural ecosystem that benefits farmers and consumers alike.
                        </p>
                    </div>
                </div>

                {/* Section: Technology Highlights */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">Our Technology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <img
                                src={sensorsimg}
                                alt="IoT Sensors"
                                className="rounded-lg shadow-md"
                            />
                            <h3 className="text-xl font-medium text-gray-800">IoT Sensors</h3>
                            <p className="text-gray-600 text-sm">
                                Real-time monitoring of soil, weather, and crop health with precision IoT devices.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <img
                                src={smartirrigation}
                                alt="Smart Irrigation"
                                className="rounded-lg shadow-md"
                            />
                            <h3 className="text-xl font-medium text-gray-800">Smart Irrigation</h3>
                            <p className="text-gray-600 text-sm">
                                Automated irrigation systems that optimize water usage and improve yield.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <img
                                src={dataanalitic}
                                alt="Data Analytics"
                                className="rounded-lg shadow-md"
                            />
                            <h3 className="text-xl font-medium text-gray-800">Data Analytics</h3>
                            <p className="text-gray-600 text-sm">
                                Predictive tools for risk management and better decision-making.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            </div>
            );
};

            export default AboutUs;
