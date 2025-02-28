import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

function DashFarmInfo({ props }) {
    const [spinner, setSpinner] = useState(1);
    const [controllData, setControllData] = useState([]);
    const [averages, setAverages] = useState({
        sensor1: 0,
        sensor2: 0,
        sensor3: 0,
        sensor4: 0
    });

    const [AllNodesData, setAllNodesData] = useState([]); // Data of all nodes in this farm


    useEffect(() => {
        const getAllNodesData = () => {
            setSpinner(1);
            const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/getFarmAllNodesData.php`;
            let fData = new FormData();

            const farmNodes = JSON.parse(props.farmNodes);
            let startNodeId = farmNodes[0].NodeId; // 'aac24'
            startNodeId = 'Node' + startNodeId.substring(3); // 'Node24'
            let lastNodeId = farmNodes[farmNodes.length - 1].NodeId; // 'aac26'
            lastNodeId = 'Node' + lastNodeId.substring(3); // 'Node26'

            fData.append('startNode', startNodeId);
            fData.append('endNode', lastNodeId);
            fData.append('mnodeId', props.mnodeId);
            fData.append('userId', Cookies.get('userId'));

            axios
                .post(url, fData)
                .then((response) => {
                    setSpinner(0);
                    const APIResponse = response.data;
                    if (APIResponse && Array.isArray(APIResponse.data)) {
                        setAllNodesData(APIResponse.data);

                    } else {
                        console.error("Invalid API response format:", APIResponse);
                        toast.warning("Invalid data received. Please try again.");
                    }
                })
                .catch((error) => { toast.error(error.message, " Try Again...!"); setSpinner(1) });
        };
        getAllNodesData();
    }, [props.farmNodes, props.mnodeId]); // Fetch data on component mount

    const calculateAverages = useCallback(() => {
        if (AllNodesData.length === 0 || !AllNodesData[0]) {
            console.warn("No data available for calculation.");
            return;
        }

        let totalSensors = { sensor1: 0, sensor2: 0, sensor3: 0, sensor4: 0 };
        let nodeCount = 0;

        // Iterate over all nodes
        Object.values(AllNodesData[0]).forEach((nodeData) => {
            try {
                const parsedData = JSON.parse(nodeData);
                totalSensors.sensor1 += parsedData.sensor1 || 0;
                totalSensors.sensor2 += parsedData.sensor2 || 0;
                totalSensors.sensor3 += parsedData.sensor3 || 0;
                totalSensors.sensor4 += parsedData.sensor4 || 0;
                nodeCount++;
            } catch (error) {
                console.warn("Skipping invalid node data:", nodeData, error);
            }
        });

        // Calculate averages
        const avg = {
            sensor1: parseFloat(totalSensors.sensor1 / nodeCount || 0).toFixed(2),
            sensor2: parseFloat(totalSensors.sensor2 / nodeCount || 0).toFixed(2),
            sensor3: parseFloat(totalSensors.sensor3 / nodeCount || 0).toFixed(2),
            sensor4: parseFloat(totalSensors.sensor4 / nodeCount || 0).toFixed(2)
        };
        setAverages(avg);
        console.log(avg);
    }, [AllNodesData]); // Only recreate if AllNodesData changes

    useEffect(() => {
        if (AllNodesData.length > 0) {
            calculateAverages(); // Automatically calculate averages when data is updated
        }
    }, [AllNodesData, calculateAverages]); // Listen for changes in AllNodesData


    const changePumpOn = () => {
        if (window.confirm(`Do You realy want to Turn  Pump  ${(controllData.PumpOn) ? 'OFF' : 'ON'} of ${props.farmName}`)) {
            setSpinner(1);
            const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/changePumpStatus.php`;
            let fData = new FormData();

            fData.append('PumpOn', (controllData.PumpOn) ? 0 : 1);
            fData.append('farmId', props.farmId);
            fData.append('mnodeId', props.mnodeId);
            fData.append('userId', Cookies.get('userId'));

            axios.post(url, fData)
                .then((response) => {
                    const APIResponse = response.data;
                    toast.success(`Farm ${props.farmName} Pump ${APIResponse.PumpOn?'ON':'OFF'} Success...`,{
                        autoClose: 500, // Duration in milliseconds
                      });
                    setControllData(APIResponse);
                    setSpinner(0);
                })
                .catch((error) => { toast.error(error.message, " Try Again...!"); setSpinner(0); });
        }

    };
    const changeAutoPumpOn = () => {
        if (window.confirm(`Do You realy want to Turn Auto Pump Setting ${(controllData.AutoPumpOn) ? 'OFF' : 'ON'} of ${props.farmName}`)) {
            setSpinner(1);
            const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/changePumpAutoStatus.php`;
            let fData = new FormData();

            console.log("data is =>", controllData.AutoPumpOn);
            fData.append('PumpAutoOn', (controllData.AutoPumpOn) ? 0 : 1);
            fData.append('farmId', props.farmId);
            fData.append('mnodeId', props.mnodeId);
            fData.append('userId', Cookies.get('userId'));

            axios.post(url, fData)
                .then((response) => {
                    const APIResponse = response.data;
                    toast.success(`Farm ${props.farmName} Auto Pump Setting ${APIResponse.AutoPumpOn?'ON':'OFF'} Success...`,{
                        autoClose: 500, // Duration in milliseconds
                      });
                    setControllData(APIResponse);
                    setSpinner(0);
                })
                .catch((error) => { alert(error.message, " Try Again...!"); setSpinner(0) });

        }
    };
    useEffect(() => {
        const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/changePumpStatus.php`;
        let fData = new FormData();


        fData.append('farmId', props.farmId);
        fData.append('mnodeId', props.mnodeId);
        fData.append('userId', Cookies.get('userId'));

        axios.post(url, fData)
            .then((response) => {
                const APIResponse = response.data;
                setControllData(APIResponse);
            })
            .catch((error) => alert(error.message, " Try Again...!"));


    }, [props.farmId, props.mnodeId]);
    return (
        <div className="bg-white border-2 border-green-600 p-2 h-fit max-h-[640px] overflow-y-scroll md:overflow-y-hidden min-h-[300px] shadow-md rounded-lg">
            {/* Loading Spinner */}
            <div role="status" className={`${spinner ? "block" : "hidden"} absolute inset-0 flex lg:ml-[15%] items-center justify-center`}>
                <svg aria-hidden="true" className="w-[100px] h-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            <p className="text-center text-4xl font-bold text-green-600 text-stroke">
                Farm Name <b className="text-orange-600">{props.farmName}</b>
            </p>
            <div className="controllers text-2xl w-full h-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 pb-5 mt-[20px] ">
                {/* Add the Motor Controller logic */}
                <div className='  bg-white p-2 border-blue-500 border-2 rounded-xl'>
                    <b className='p-2 mt-4 h-[100px]'>Pump Status : {controllData.PumpOn ? <b className='text-green-600'>ON</b> : <b className='text-red-600'>OFF</b>} </b> <br />
                    <b className='p-2 mt-4 h-[100px]'>Pump Auto   : {controllData.AutoPumpOn ? <b className='text-green-600'>ON</b> : <b className='text-red-600'>OFF</b>} </b>

                </div>
                <div className='  bg-white border-blue-500 border-2 rounded-xl'>
                    <div className="flex">
                        <div className="flex items-center gap-3 px-2 py-1">
                            <div className="name font-bold w-[180px]">Pump ON/OFF  :</div>
                            <div
                                className={`relative inline-block w-[70px] h-8 cursor-pointer rounded-full transition-colors duration-300 ${controllData.PumpOn ? 'bg-green-500' : 'bg-red-500'
                                    }`}                                                    // PumpOn , AutoPumpOn
                                onClick={() => { changePumpOn() }}
                            >

                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${controllData.PumpOn ? 'transform translate-x-[37px]' : ''
                                        }`}
                                ></div>
                            </div>

                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-center gap-3 px-2 py-1">
                            <div className="name font-bold w-[180px]">Auto  ON/OFF  :</div>
                            <div
                                className={`relative inline-block w-[70px] h-8 cursor-pointer rounded-full transition-colors duration-300 ${controllData.AutoPumpOn ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                onClick={() => { changeAutoPumpOn() }}
                            >

                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${controllData.AutoPumpOn ? 'transform translate-x-[37px]' : ''
                                        }`}
                                ></div>
                            </div>

                        </div>
                    </div>
                </div>



                {/*End of Add the Motor Controller logic */}
            </div>
            <p className="text-center text-3xl font-bold  ">
                Averages Of All Nodes
            </p>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 pb-5 mt-[10px]">
                {/* Sensor 1 Air Temprature */}
                <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg p-0'>
                    <div className="flex h-full flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-lg">
                        <div className="sensorNa3me text-3xl font-bold text-gray-800">Air Temprature</div>
                        {/* Temperature Numeric Display */}
                        <div className="text-2xl font-bold text-gray-800">
                            {averages.sensor1}°C
                        </div>

                        {/* Temperature Visual Representation */}
                        <div className='flex'>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>0°C</span>
                            <div className=" w-[180px] md:w-[180px]  sm:w-[180px] lg:w-[150px] xl-[180px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(averages.sensor1 / 50) * 100}%`,
                                        background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                                    }}
                                ></div>
                            </div>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>50°C</span>
                        </div>


                        {/* Optional: Add a weather icon */}
                        <div className="text-5xl text-yellow-500">
                            {averages.sensor1 > 30 ? "☀️" : "🌤️"}
                        </div>
                    </div>
                </div>
                {/* Sensor 2 Soild Temprature */}
                <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
                    <div className="flex h-full flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-lg">
                        <div className="sensorNa3me text-3xl font-bold text-gray-800">Soil Temprature</div>
                        {/* Temperature Numeric Display */}
                        <div className="text-2xl font-bold text-gray-800">
                            {averages.sensor2}°C
                        </div>

                        {/* Temperature Visual Representation */}
                        <div className='flex'>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>0°C</span>
                            <div className="w-[180px] md:w-[180px]  sm:w-[180px] lg:w-[150px] xl-[180px] max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(averages.sensor2 / 50) * 100}%`,
                                        background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                                    }}
                                ></div>
                            </div>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>50°C</span>
                        </div>


                        {/* Optional: Add a weather icon */}
                        <div className="text-5xl text-yellow-500">
                            {averages.sensor2 > 30 ? "☀️" : "🌤️"}
                        </div>
                    </div>
                </div>
                {/* Sensor 3 Humidity */}
                <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
                    <div className="flex h-full flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-lg">
                        <div className="sensorNa3me text-3xl font-bold text-gray-800">Air Humidity</div>
                        {/* Temperature Numeric Display */}
                        <div className="text-2xl font-bold text-gray-800">
                            {averages.sensor3}%
                        </div>

                        {/* Temperature Visual Representation */}
                        <div className='flex'>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>0%</span>
                            <div className="w-[180px] md:w-[180px]  sm:w-[180px] lg:w-[150px] xl-[180px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${averages.sensor3}%`,
                                        background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                                    }}
                                ></div>
                            </div>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>100%</span>
                        </div>


                        {/* Optional: Add a weather icon */}
                        <div className="text-5xl text-yellow-500">
                            {averages.sensor3 > 40 ? " 🌧️" : "🌁"}
                        </div>
                    </div>
                </div>

                {/* Sensor 4 Soil Moisture */}
                <div className='bg-white border-blue-600 border-2 h-[200px] rounded-lg '>
                    <div className="flex h-full flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-lg">
                        <div className="sensorNa3me text-3xl font-bold text-gray-800">Soil Moisture</div>
                        {/* Temperature Numeric Display */}
                        <div className="text-2xl font-bold text-gray-800">
                            {averages.sensor4}%
                        </div>

                        {/* Temperature Visual Representation */}
                        <div className='flex'>
                            <span className='mt-[-6px] text-2xl font-bold mx-2 '>0%</span>
                            <div className="w-[180px] md:w-[180px]  sm:w-[180px] lg:w-[150px] xl-[180px]  max-w-md h-6 bg-gray-300 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${averages.sensor4}%`,
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
    );
}

export default DashFarmInfo;
