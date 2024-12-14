import React, { useState } from "react";
import logo from "../assets/logo.jpg"
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-2 py-2">
        {/* Logo */}
        <div className="flex">
        <img  className="w-[50px] h-[50px]"  alt="logo"src={logo}></img>
        <div className="text-xl pt-3 flex font-bold text-green-600">
         SMART AGRO
        </div>
        </div>
        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex md:items-center space-x-10">
          <Link to="./" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}   className=" font-bold text-2xl text-gray-600 hover:text-green-600">
            Home
          </Link>
          <Link to="/Aboutus" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className="font-bold text-2xl text-gray-600 hover:text-green-600">
            About Us
          </Link>
          <Link onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}} to="/Contact" className="block font-bold text-2xl text-gray-600 hover:text-green-600">
              Contact
            </Link>
         
          <Link to="/Blogs" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className=" font-bold text-2xl text-gray-600 hover:text-green-600">
            Blogs
          </Link>
          <Link to="/Signup" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className="font-bold text-2xl border-2 rounded-lg    border-green-600 pl-2 pr-2 pb-[3px] text-gray-600 hover:text-green-600">
            Sign Up
          </Link>
          <Link to="/Login" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}} x className="font-bold text-2xl border-2 rounded-lg    border-green-600 pl-2 pr-2 pb-[3px] text-gray-600 hover:text-green-600">
            Login
          </Link>
          
        </div>
      </div>

      {/* Dropdown Menu for Small Devices */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <Link onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  to="./" className="block font-bold text-2xl text-gray-600 hover:text-green-600">
              Home 
            </Link>
            <Link onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}} to="/Aboutus" className="block font-bold text-2xl text-gray-600 hover:text-green-600">
              About Us
            </Link>
            <Link onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}} to="/Contact" className="block font-bold text-2xl text-gray-600 hover:text-green-600">
              Contact Us
            </Link>
           
            <Link to="/Blogs" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className="block font-bold text-2xl text-gray-600 hover:text-green-600">
              Blogs
            </Link>
            <Link to="/Signup" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className="font-bold text-2xl border-2 rounded-lg    border-green-600 pl-2 pr-2 pb-[3px] text-gray-600 hover:text-green-600">
            Sign Up
          </Link>
          <Link to="/Login" onClick={() =>{ window.scrollTo({ top:0, behavior: "smooth" });setIsMenuOpen(!isMenuOpen)}}  className="font-bold text-2xl border-2 rounded-lg    border-green-600 pl-2 pr-2 pb-[3px] text-gray-600 hover:text-green-600">
            Login
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
