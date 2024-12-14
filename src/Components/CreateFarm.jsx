import { useEffect, useState } from "react"
import React from 'react'
import Cookies from "js-cookie";
import topviewoffarm from '../assets/topviewoffarm.jpg'
import axios from "axios";
import reload from "../assets/reload.png"
const CreateFarm = () => {

    const [points, setPoints] = useState([]);
    const [Nodes, setNodes] = useState([]);
    const [MnodeId, setMnodeId] = useState('');
    const [FarmName, setFarmName] = useState('');
    const removeLastPoint = () => {
        setPoints((prevPoints) => prevPoints.slice(0, -1));
      };
      const removeLastNode = () => {
        setNodes((prevNodes) => prevNodes.slice(0, -1));
      };
    const handleScreenTouch = (e) => {
        console.log(points);
        if (points.length >= 50) {
            console.log("You can only Select 50 Points...");
        }
        else {
            const rect = e.target.getBoundingClientRect();
            const newPoint = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            setPoints((prevPoints) => [...prevPoints, newPoint]);
        }
    };

    const handleShapeClick = (e) => {
        if (Nodes.length >= 50) {
            alert("You can only Select Maximum 50 Nodes...");
        }
        else {
            const rect = e.target.getBoundingClientRect();
            const newNode = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            setNodes((prevButtons) => [...prevButtons, newNode]);
        }
    };




    const resetPoints = () => { setPoints([]); setNodes([]); };
    const resetNodes = () => setNodes([]);

    const convertToClipPath = (shapePoints) => {
       // if (shapePoints.length < 4) return "none";
        return `polygon(${shapePoints.map((point) => `${point.x}px ${point.y}px`).join(", ")})`;
    };

    const [mnodedata, setMnodedata] = useState([]);
    const NodesData = () => {
        const url = `https://darkslategray-lion-860323.hostingersite.com/smart-agri/software/user/getNoOfMNodes.php`;
        let fData = new FormData();
       
        fData.append('userId', Cookies.get('userId'));

        axios.post(url, fData)
            .then((response) => {
                const APIResponse = response.data; // This is response data from AXIOS
                setMnodedata(APIResponse.data);
                
            })
            .catch(error => alert(error, " Try Again...!"));
    }


    const SaveFarm = () => {
        if (points.length < 4) {
            alert("First Make The Design Of the Farm and Add Nodes");
        }
        else if (Nodes.length < 1) {
            alert("Add at least one Node");
        }
        else if (MnodeId.length === 0) {
            alert("Select the Master Node Id...");
        }
        else if (MnodeId === 'MNodeId') {
            alert("Select the Master Node Id...");
        }
        else if (FarmName.length === 0) {
            alert("Enter the Farm Name ...");
        }
        else {
            if (window.confirm(`Confirm To Save The Farm ${FarmName} With Master NodeId ${MnodeId}`)) {
                const url = `https://darkslategray-lion-860323.hostingersite.com/smart-agri/software/user/CreateFarm.php`;
                let fData = new FormData();
                fData.append('FarmName', FarmName);
                fData.append('MNodeId', MnodeId);
                fData.append('FarmShape', JSON.stringify(points)); // Serialize as JSON
                fData.append('FarmNodes', JSON.stringify(Nodes));  // Serialize as JSON
                fData.append('userId', Cookies.get('userId'));

                axios.post(url, fData)
                    .then((response) => {
                        const APIResponse = response.data; // This is response data from AXIOS
                        if(APIResponse.status==='success'){
                            window.location.reload();
                        } 
                        alert(APIResponse.message)
                    })
                    .catch(error => alert(error, " Try Again...!"));
            }
        }

    }


    useEffect(() => {
           NodesData();
    }, []);
    return (
        <div className="relative w-full h-full bg-gray-100">
            {/* Clickable Map Area */}
            <div
                className="absolute w-full h-full bg-blue-100"
                onClick={handleScreenTouch}
            >
               
                    <p className="absolute top-1 left-1 bg-white p-2 rounded shadow">
                        Tap On Screen to create a shape.
                    </p>
               
            </div>

            {/* Render the shape if 4 points are provided */}
            {points.length  && (
                <div
                    className="absolute overflow-visible bg-blue-500 flex justify-center items-center text-white font-bold"
                    style={{
                        clipPath: convertToClipPath(points),
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${topviewoffarm})`,
                        backgroundSize: "cover"
                    }}
                    onClick={handleShapeClick}
                >
                    <div className="text-center overflow-visible">

                        <p>Click The Position Where You Installed The Nodes.</p>

                        {/* Render buttons at clicked positions */}
                        {Nodes.map((Nodes, index) => (
                            <button
                                key={index}
                                className="absolute z-[150] bg-purple-500 text-white py-1 px-2 rounded"
                                style={{ top: `${Nodes.y}px`, left: `${Nodes.x}px` }}

                            >
                                Node {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}


            {/* Reset Button */}
            <button
                onClick={resetPoints}
                className="absolute bottom-2 left-4 bg-red-500 text-white py-2 px-4 rounded shadow"
            >
                Reset Shape
            </button>

            {/* Master Node Select For Farm */}
            <select
                value={MnodeId}
                onChange={(e) => setMnodeId(e.target.value)}
                className="absolute bottom-[55px] right-[255px] bg-white text-black py-2 px-4 rounded shadow"
            >
                <option>MNodeId</option>
            {  
               mnodedata.map((mnode, index) => (
                     <option key={index}>{mnode.mnodeId}</option>
                    ))
            }
            </select>

            {/* Farm Name input */}
            <input
                value={FarmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="Farm Name..."
                className=" w-[130px] absolute bottom-[55px] right-[110px] bg-white text-black py-2 px-4 rounded shadow"
            />


            {/* Reset Nodes */}
            <button
                onClick={SaveFarm}
                className="absolute bottom-[55px] right-4 bg-green-500 text-white py-2 px-4 rounded shadow"
            >

                Create
            </button>
             {/* Remove latest points*/}
             <button
                onClick={removeLastPoint}
                className="absolute bottom-2 left-[145px] text-white py-1 px-1 rounded shadow"
            >
           <img className="w-[30px] h-[30px]" src={reload}alt="Undo"></img>
                
            </button>

           
              {/* Remove latest Node*/}
              <button
                onClick={removeLastNode}
                className="absolute bottom-2 right-[145px] text-white py-1 px-1 rounded shadow"
            >
           <img className="w-[30px] h-[30px]" src={reload}alt="Undo"></img>
            </button>
            {/* Reset Nodes */}
            <button
                onClick={resetNodes}
                className="absolute bottom-2 right-4 bg-red-500 text-white py-2 px-4 rounded shadow"
            >
                Reset Nodes
            </button>

        </div>
    );
};

export default CreateFarm