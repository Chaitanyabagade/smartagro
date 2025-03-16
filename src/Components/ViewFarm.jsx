import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import topviewoffarm from '../assets/topviewoffarm.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import reloadimg from '../assets/reload.png'
import { toast } from 'react-toastify';
const ViewFarm = () => {

  const [spinner, setSpinner] = useState(0);
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
    setSpinner(1);
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

        setNodeData(JSON.parse(APIResponse.data[0][NodeId]));
        setSpinner(0);
        setIsPopUp(1);
      })
      .catch(error => toast.error(error, " Try Again...!"), setSpinner(0));


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
        setSpinner(1);
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
              setSpinner(0);
              window.location.reload();
            }

          })
          .catch(error => alert(error, " Try Again...!"), setSpinner(0));
      }

    }


  }

  const [min, setMin] = useState(farm.MoistureMin);
  const [max, setMax] = useState(farm.MoistureMax);
  
  const saveMoisture = () => {
    setSpinner(1);
    const url = `https://darkslategray-lion-860323.hostingersite.com/smart-agri/software/user/setMoisture.php`;
    let fData = new FormData();
    fData.append('farmId', farm.farmId);
    fData.append('max',max);
    fData.append('min',min);
    axios.post(url, fData)
      .then((response) => {
        const APIResponse = response.data; // This is response data from AXIOS
        setSpinner(0);
        if (APIResponse.status === "success" || APIResponse.status === "error") {
           toast.success(APIResponse.message);
        }

      })
      .catch(error => alert(error, " Try Again...!"), setSpinner(0));
}

return (
  <div className='w-full overflow-x-clip h-full bg-blue-100'>
    {/* Loading Spinner */}
    <div role="status" className={`${spinner ? "block" : "hidden"} z-[200] absolute inset-0 flex lg:ml-[15%] items-center justify-center`}>
      <svg aria-hidden="true" className="w-[60px] h-[60px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
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
          <button onClick={() => { setNodeIdToShowPopUp(Nodes.NodeId); getNodeData(Nodes.NodeId); }}
            key={index}
            className="absolute z-[150] bg-purple-500 text-white w-[40px]  h-[40px] text-xl rounded-full "
            style={{ top: `${Nodes.y - 12}px`, left: `${Nodes.x - 15}px` }}

          >
            {Nodes.NodeId.slice(3)}
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
                    width: `${nodeData.sensor4}%`,
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
    <div
      className="absolute bottom-2 ml-2  text-blue-500 py-2 px-4 rounded shadow"
    >
      <div className="flex sm:float-left ss:float-none">
        <label htmlFor="" className='mx-1'>Min</label>
        <select className='mx-1' value={min} onChange={(e) => setMin(parseInt(e.target.value, 10))}>
        <option value={5}>5%</option>
          <option value={10}>10%</option>
          <option value={15}>15%</option>
          <option value={20}>20%</option>
          <option value={25}>25%</option>
          <option value={30}>30%</option>
          <option value={35}>35%</option>
          <option value={40}>40%</option>
          <option value={45}>45%</option>
          <option value={50}>50%</option>
          <option value={55}>55%</option>
          <option value={60}>60%</option>
          <option value={65}>65%</option>
          <option value={70}>70%</option>
          <option value={75}>75%</option>
          <option value={80}>80%</option>
          <option value={85}>85%</option>
          <option value={90}>90%</option>
          <option value={95}>95%</option>
        </select>
        <label htmlFor="" className='mx-1'>Max</label>
        <select className='mx-1' value={max} onChange={(e) => setMax(parseInt(e.target.value, 10))}>
        <option value={10}>10%</option>
          <option value={15}>15%</option>
          <option value={20}>20%</option>
          <option value={25}>25%</option>
          <option value={30}>30%</option>
          <option value={35}>35%</option>
          <option value={40}>40%</option>
          <option value={45}>45%</option>
          <option value={50}>50%</option>
          <option value={55}>55%</option>
          <option value={60}>60%</option>
          <option value={65}>65%</option>
          <option value={70}>70%</option>
          <option value={75}>75%</option>
          <option value={80}>80%</option>
          <option value={85}>85%</option>
          <option value={90}>90%</option>
          <option value={95}>95%</option>
        </select>
      </div>
      <button onClick={saveMoisture} className={` bg-green-600 text-black rounded-sm px-2 ml-4 text-lg`}>Save</button>

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