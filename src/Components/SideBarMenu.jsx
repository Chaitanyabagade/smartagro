import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook to programmatically navigate
  // Close dropdown when clicking outside
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:w-64 w-full overflow-y-scroll bg-white text-gray-800 mt-[50px] h-screen fixed top-0 left-0 lg:block hidden shadow-lg">
      <div className="p-6">
        <ul className="mt-8 space-y-6">
          <li>
            <Link to="/" className="block py-2 px-4 text-lg hover:bg-gray-100 rounded-md">
              Dashboard
            </Link>
          </li>
          <li>
            <div className="relative inline-block text-xl" ref={dropdownRef}>
              <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 rounded ">
                View Farms
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
            <Link to="/CreateFarm" className="block py-2 px-4 text-lg hover:bg-gray-100 rounded-md">
              Create Farm
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarMenu;
