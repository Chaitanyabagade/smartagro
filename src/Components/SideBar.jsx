import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.jpg"
import axios from "axios";
import { Link } from "react-router-dom";
import profileimg from "../assets/profile.png"
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profile, setProfile] = useState(0);
    const navbarRef = useRef(null);
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    // Close navbar when clicking outside

    const [FarmData, setFarmData] = useState([]);
    const getFarmData = () => {
        const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/getFarmData.php`;
        let fData = new FormData();

        fData.append('FarmId', '');
        fData.append('userId', Cookies.get('userId'));

        axios.post(url, fData)
            .then((response) => {
                const APIResponse = response.data; // This is response data from AXIOS
                console.log(APIResponse.data);
                setFarmData(APIResponse.data);
            })
            .catch(error => alert(error, " Try Again...!"));
    }

    const handleFarmClick = (farm) => {
        navigate('/ViewFarm', { state: { farm } }); // Passing farm data via state
        console.log("Navigating")
    };
    useEffect(() => {

        getFarmData();



        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setProfile(false);
                setIsOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }


        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div ref={navbarRef} className="container mx-auto flex justify-between items-center px-2 py-2">
                {/* Logo */}
                <div className="flex">
                    <img className="w-[50px] h-[50px]" alt="logo" src={logo}></img>
                    <div className="text-xl pt-3 flex font-bold text-green-600">
                        SMART AGRO
                    </div>
                </div>
                {/* Hamburger Menu Button */}
                <div className="lg:hidden">
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
                {/* Profile */}
                <button className="hidden lg:block" onClick={() => setProfile(!profile)}>
                    <img className="w-[40px] h-[40px] mr-4" src={profileimg} alt="profile" />
                </button>
                {profile ? <div ref={profileRef} class="fixed top-[75px] right-5 z-[100] rounded-lg bg-white text-black border-2 border-gray-300  w-[250px] h-[300px] p-4 shadow-lg">
                    <h1 className="font-semibold text-xl"> {Cookies.get('firstName')} {Cookies.get('lastName')} </h1>
                    <h2 className="py-2">{Cookies.get('email')}</h2>
                    <hr /><hr /><hr /><hr />
                    <p className="p-2 font-semibold">No.Of Master Nodes => {Cookies.get('noOfMNodes') || 0}</p>
                    {/************ if anything add also addd it in line no.92 to 98 */}


                    {/************* End of Profiles ************* */}
                    <button onClick={() => {
                        if (window.confirm("Do You Want To Logout...")) {
                            Cookies.remove('email');
                            Cookies.remove('userId');
                            Cookies.remove('firstName');
                            Cookies.remove('lastName');
                            Cookies.remove('noOfMNodes');
                            navigate('./');
                            window.location.reload();
                        }
                    }}
                        class="bg-white text-blue-800 text-xl font-semibold p-2 w-[87%] border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-100 absolute bottom-4 left-4 right-4">
                        Logout
                    </button>
                </div> : <>
                    {isMenuOpen &&
                        <div ref={profileRef} class="fixed top-[75px] right-5 z-[100] pb-[80px] rounded-lg bg-white text-black border-2 border-gray-300  w-[300px] max-h-[80vh] h-fit overflow-y-scroll p-4 shadow-lg">
                            <h1 className="font-semibold text-xl"> {Cookies.get('firstName')} {Cookies.get('lastName')} </h1>
                            <h2 className="py-2">{Cookies.get('email')}</h2>
                            <hr /> <hr /><hr /><hr />
                            <p className="p-2 font-semibold">No.Of Master Nodes => {Cookies.get('noOfMNodes') || 0}</p>



                            {/*add here*/}


                            <hr /><hr /><hr /><hr />
                            {/************* SideBarMenuCodeForSmallDevices ************* */}
                            <div className="p-2">
                                <ul className="mt-1 space-y-6">
                                    <li>
                                        <a href="/" className="block  px-2 text-lg hover:bg-gray-100 rounded-md">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <div className="relative inline-block" ref={dropdownRef}>
                                            <button onClick={() =>setIsOpen(!isOpen)} className="px-2 text-xl py-2 rounded ">
                                                Farms
                                            </button>
                                            {isOpen && (
                                                <div className="absolute z-[151] left-11 mt-1 w-40 bg-white border rounded shadow">
                                                    {FarmData && FarmData.length > 0 ? (
                                                        FarmData.map((farm, index) => (
                                                            <button onClick={() => handleFarmClick(farm)} key={index} className="block px-4 w-full h-full py-2 text-left hover:bg-gray-100">
                                                                {farm.farmName}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <p>No farms Created.</p> // Or any fallback message or UI
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </li>

                                    <li>
                                        <Link to="/CreateFarm" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsMenuOpen(!isMenuOpen) }} className="block py-2 px-2 text-lg hover:bg-gray-100 rounded-md">
                                            Create Farm
                                        </Link>
                                    </li>

                                </ul>
                            </div>




                            {/************* EndOFSideBarMenuCodeForSmallDevices ************* */}
                            <button onClick={() => {
                                if (window.confirm("Do You Want To Logout...")) {
                                    Cookies.remove('email');
                                    Cookies.remove('userId');
                                    Cookies.remove('firstName');
                                    Cookies.remove('lastName');
                                    Cookies.remove('noOfMNodes');
                                    navigate('./');
                                    window.location.reload();
                                }
                            }}
                                class="bg-white  text-blue-800 text-xl  font-semibold mt-5 p-2 w-[87%] border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-100 absolute  left-4 right-4">
                                Logout
                            </button>
                        </div>}
                </>
                }
            </div>
        </nav>
    );
};

export default SideBar;
