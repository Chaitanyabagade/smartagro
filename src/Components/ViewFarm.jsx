import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import topviewoffarm from '../assets/topviewoffarm.jpg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import reloadimg from '../assets/reload.png'
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
            .catch(error => alert(error, " Try Again...!"));


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
            <div ref={popUpRef} className={`${isPopUp ? 'block' : 'hidden'} rounded-xl border-2 border-blue-600 popup w-[90%] p-2 h-[80%] sm:w-[90%] sm:h-[80%] md:w-[70%] md:h-[80%]  lg:w-[60%] lg:h-[70%] m-[5%] sm:m-[5%] md:m-[5%] md:ml-[10%] bg-white  fixed z-[10]`}>
                <div className="nav flex justify-between">
                    <button className="reload" onClick={()=>{getNodeData(nodeIdToShowPopUp)}}><img className='w-[30px] h-[30px]  ' src={reloadimg}alt="reload"/></button>
                    <p className='text-3xl text-green-600 text-center font-bold'>Node id=>{nodeIdToShowPopUp}</p>
                    <button className="close bg-red-600 text-white font-bold w-fit p-1 px-2 rounded-md" onClick={()=>setIsPopUp(false)}>Close</button>
                </div>
                <p className='text-3xl text-orange-500 text-center font-semibold'>Sensors Data</p>

                <p>Sensor 1 => {nodeData.sensor1}</p>
                <p>Sensor 2 => {nodeData.sensor2}</p>
                <p>Sensor 3 => {nodeData.sensor3}</p>
                <p>Sensor 4 => {nodeData.sensor4}</p>
                <p>Sensor 5 => {nodeData.sensor5}</p>
                <p>Sensor 6 => {nodeData.sensor6}</p>
                <p>Sensor 7 => {nodeData.sensor7}</p>
                <p>Sensor 8 => {nodeData.sensor8}</p>
                <p>Sensor 9 => {nodeData.sensor9}</p>
                <p>Sensor 10 => {nodeData.sensor10}</p>

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
