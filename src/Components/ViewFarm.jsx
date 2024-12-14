import React, { useState,useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import topviewoffarm from '../assets/topviewoffarm.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ViewFarm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPopUp,setIsPopUp]=useState(0);
     const popUpRef = useRef(null);
    const [nodeIdToShowPopUp,setNodeIdToShowPopUp]=useState(0);
    const { farm } = location.state || {}; // Accessing the passed farm data

    const convertToClipPath = (shapePoints) => {

        return `polygon(${shapePoints.map((point) => `${point.x}px ${point.y}px`).join(", ")})`;
    };
   
    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                setIsPopUp(false);
            }
           


        };
        document.addEventListener("mousedown", handleClickOutside);

    },[])

    const DeleteFarm = () => {

        if (window.confirm(`Confirm To Delete The Farm ${farm.farmName}...`)) {
            if (window.confirm(`Confirm To Delete The Farm ${farm.farmName}...`)) {
                if (window.confirm(`Confirm To Delete The Farm ${farm.farmName}...`)) {
                    const url = `https://darkslategray-lion-860323.hostingersite.com/smart-agri/software/user/DeleteFarm.php`;
                    let fData = new FormData();

                    fData.append('farmId', farm.farmId);
                    fData.append('mnodeId', farm.mnodeId);
                    fData.append('userId', Cookies.get('userId'));

                    axios.post(url, fData)
                        .then((response) => {
                            const APIResponse = response.data; // This is response data from AXIOS
                            alert(APIResponse.message);
                            if (APIResponse.status === "success" || APIResponse.status === "error") {
                                navigate('/');
                                window.location.reload();
                            }

                        })
                        .catch(error => alert(error, " Try Again...!"));
                }
            }
        }


    }


    return (
        <div className='w-full overflow-x-clip h-full bg-blue-100'>
            <div
                className=" fixed mt-1 ml-1 w-[250px] h-full bg-blue-100"

            >
                <p className=" w-full font-semibold top-1 left-1 bg-white p-2 rounded shadow">
                       Farm Name =>>  {farm.farmName} <br /> Master Node Id ==> {farm.mnodeId}
                </p>



            </div>
            <div className="fixed w-full h-full   flex justify-center items-center text-white font-bold"
                style={{
                    clipPath: convertToClipPath(JSON.parse(farm.farmShape)),
                    backgroundImage: `url(${topviewoffarm})`,
                    backgroundSize: "cover"
                }}

            >


                <div className="text-center">
                    {JSON.parse(farm.farmNodes) && JSON.parse(farm.farmNodes).map((Nodes, index) => (
                        <button onClick={()=>{setNodeIdToShowPopUp(index+1);setIsPopUp(!isPopUp)}}
                            key={index} 
                            className="absolute z-[150] bg-purple-500 text-white py-1 px-2 rounded"
                            style={{ top: `${Nodes.y}px`, left: `${Nodes.x}px` }}

                        >
                            Node {index + 1}
                        </button>
                    ))
                    }
                </div>


            </div>
            {/**  Open Sensor Dialog when clicked to the buttons */}
            <div ref={popUpRef} className={`${isPopUp?'block':'hidden'} rounded-xl border-2 border-blue-600 popup w-[90%] p-2 h-[80%] sm:w-[90%] sm:h-[80%] md:w-[70%] md:h-[80%]  lg:w-[60%] lg:h-[70%] m-[5%] sm:m-[5%] md:m-[5%] md:ml-[10%] bg-white  fixed z-[10]`}>
                Node id=>{nodeIdToShowPopUp}
            </div>
            {/* Reset Nodes */}
            <button
                onClick={DeleteFarm}
                className="absolute bottom-2 right-4 bg-red-500 text-white py-2 px-4 rounded shadow"
            >
                Delete Farm
            </button>
        </div>


    );

}
export default ViewFarm;
