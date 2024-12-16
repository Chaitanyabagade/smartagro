import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import topviewoffarm from '../assets/topviewoffarm.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import reloadimg from '../assets/reload.png'
import { toast } from 'react-toastify';
const ViewFarm = () => {
 

  const navigate = useNavigate();
  const location = useLocation();
  const [isPopUp, setIsPopUp] = useState(0);
  const popUpRef = useRef(null);
  const [nodeIdToShowPopUp, setNodeIdToShowPopUp] = useState(0);
  const { farm } = location.state || {}; // Accessing the passed farm data

  const convertToClipPath = (shapePoints) => {

    return `polygon(${shapePoints.map((point) => `${point.x}px ${point.y}px`).join(", ")})`;
  };

  const [nodeData, setNodeData] = useState([]);
  function getNodeData(nodeId) {
    console.log("get data of id", nodeId);
    const MNodeId = nodeId.substring(0, 3); // 'aac'
    const NodeId = 'Node' + nodeId.substring(3);

    console.log("MnodeId=>", MNodeId);
    console.log("NodeId =>", NodeId);

    const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/getNodeData.php`;
    let fData = new FormData();


    fData.append('MNodeId', MNodeId);
    fData.append('NodeId', NodeId);

    axios.post(url, fData)
      .then((response) => {
        const APIResponse = response.data; // This is response data from AXIOS
        console.log((JSON.parse(APIResponse.data[0][NodeId])))
        setNodeData(JSON.parse(APIResponse.data[0][NodeId]));

      })
      .catch(error => toast.error(error, " Try Again...!"));


  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsPopUp(false);
      }

    };
    document.addEventListener("mousedown", handleClickOutside);



  }, [])

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
            <button onClick={() => { setNodeIdToShowPopUp(Nodes.NodeId); setIsPopUp(!isPopUp); getNodeData(Nodes.NodeId); }}
              key={index}
              className="absolute z-[150] bg-purple-500 text-white py-1 px-2 rounded"
              style={{ top: `${Nodes.y}px`, left: `${Nodes.x}px` }}

            >
                            N=> {Nodes.NodeId}
            </button>
          ))
          }
        </div>


      </div>
      {/**  Open Sensor Dialog when clicked to the buttons */}
      <div ref={popUpRef} className={`${isPopUp ? 'block' : 'hidden'} rounded-xl border-2 border-blue-600 popup w-[90%] p-2 h-[80%] sm:w-[90%] sm:h-[80%] md:w-[70%] md:h-[80%]  lg:w-[60%] lg:h-[70%] m-[5%] sm:m-[5%] md:m-[5%] md:ml-[10%] bg-white  fixed z-[10] overflow-y-scroll`}>
        <div className="nav flex justify-between">
          <button className="reload" onClick={() => { getNodeData(nodeIdToShowPopUp); toast.success("Data Fetched Success...") }}><img className='w-[30px] h-[30px]  ' src={reloadimg} alt="reload" /></button>
          <p className='text-3xl text-green-600 text-center font-bold'>Node id=>{nodeIdToShowPopUp}</p>
          <button className="close bg-red-600 text-white font-bold w-fit p-1 px-2 rounded-md" onClick={() => setIsPopUp(false)}>Close</button>
        </div>


        {/*  

                  Air Temprature  => Sensor 1 
                  Air Humidity    => Sensor 2
                  Soil Temprature => Sensor 3
                  Soil Moisture   => Sensor 4

                <p>Air Temprature  => {nodeData.sensor1}</p>
                <p>Air Humidity  => {nodeData.sensor2}</p>
                <p>Soil Temprature => {nodeData.sensor3}</p>
                <p>Soil Moisture => {nodeData.sensor4}</p>
                */}

        <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 pb-5 mt-[30px]">
          {/* Sensor 1 Air Temprature */}
          <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg p-0'>
            <div className="flex h-full flex-col items-center space-y-2 p-2 bg-blue-50 rounded-lg shadow-lg">
              <div className="sensorNa3me text-3xl font-bold text-gray-800">Air Temprature</div>
              {/* Temperature Numeric Display */}
              <div className="text-2xl font-bold text-gray-800">
                {nodeData.sensor1}°C
              </div>

              {/* Temperature Visual Representation */}
              <div className='flex'>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>0°C</span>
                <div className=" w-[210px] md:w-[250px]  sm:w-[300px] lg:w-[270px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(nodeData.sensor1 / 50) * 100}%`,
                      background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                    }}
                  ></div>
                </div>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>50°C</span>
              </div>


              {/* Optional: Add a weather icon */}
              <div className="text-5xl text-yellow-500">
                {nodeData.sensor1 > 30 ? "☀️" : "🌤️"}
              </div>
            </div>
          </div>
          {/* Sensor 2 Soild Temprature */}
          <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
            <div className="flex h-full flex-col items-center space-y-2 p-2 bg-blue-50 rounded-lg shadow-lg">
              <div className="sensorNa3me text-3xl font-bold text-gray-800">Soil Temprature</div>
              {/* Temperature Numeric Display */}
              <div className="text-2xl font-bold text-gray-800">
                {nodeData.sensor2}°C
              </div>

              {/* Temperature Visual Representation */}
              <div className='flex'>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>0°C</span>
                <div className="w-[210px] md:w-[250px]  sm:w-[300px] lg:w-[270px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(nodeData.sensor2 / 50) * 100}%`,
                      background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                    }}
                  ></div>
                </div>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>50°C</span>
              </div>


              {/* Optional: Add a weather icon */}
              <div className="text-5xl text-yellow-500">
                {nodeData.sensor2 > 30 ? "☀️" : "🌤️"}
              </div>
            </div>
          </div>
          {/* Sensor 3 Humidity */}
          <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
            <div className="flex h-full flex-col items-center space-y-2 p-2 bg-blue-50 rounded-lg shadow-lg">
              <div className="sensorNa3me text-3xl font-bold text-gray-800">Air Humidity</div>
              {/* Temperature Numeric Display */}
              <div className="text-2xl font-bold text-gray-800">
                {nodeData.sensor3}%
              </div>

              {/* Temperature Visual Representation */}
              <div className='flex'>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>0%</span>
                <div className="w-[210px] md:w-[250px]  sm:w-[300px] lg:w-[270px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${nodeData.sensor3}%`,
                      background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                    }}
                  ></div>
                </div>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>100%</span>
              </div>


              {/* Optional: Add a weather icon */}
              <div className="text-5xl text-yellow-500">
               {nodeData.sensor3 > 40 ? " 🌧️" : "🌁"}
              </div>
            </div>
          </div>

          {/* Sensor 4 Soil Moisture */}
          <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
            <div className="flex h-full flex-col items-center space-y-2 p-2 bg-blue-50 rounded-lg shadow-lg">
              <div className="sensorNa3me text-3xl font-bold text-gray-800">Soil Moisture</div>
              {/* Temperature Numeric Display */}
              <div className="text-2xl font-bold text-gray-800">
                {nodeData.sensor4}%
              </div>

              {/* Temperature Visual Representation */}
              <div className='flex'>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>0%</span>
                <div className="w-[210px] md:w-[250px]  sm:w-[300px] lg:w-[270px] max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${nodeData.sensor4 }%`,
                      background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                    }}
                  ></div>
                </div>
                <span className='mt-[-6px] text-2xl font-bold mx-2 '>100%</span>
              </div>


              {/* Optional: Add a weather icon */}
              <div className="text-5xl text-yellow-500">
                
                🌱
              </div>
            </div>
          </div>

        </div>





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