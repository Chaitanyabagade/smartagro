import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

function DashFarmInfo({ props }) {
    
  //  const noOfNodes=JSON.parse(props.farmNodes).length;
    const [AllNodesData, setAllNodesData] = useState([]);
    const getAllNodesData =() => {
        const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/getFarmAllNodesData.php`;
        let fData = new FormData();
        
        const farmNodes = JSON.parse(props.farmNodes);
        let firstNodeId = farmNodes[0].NodeId; // 'aac24
        firstNodeId = 'Node' + firstNodeId.substring(3); // 'Node24'
        let lastNodeId = farmNodes[farmNodes.length - 1].NodeId; // 'aac26'
        lastNodeId = 'Node' + lastNodeId.substring(3); // 'Node26'
        
        fData.append('startNode',firstNodeId);
        fData.append('endNode',lastNodeId);
        fData.append('mnodeId',props.mnodeId);
        fData.append('userId', Cookies.get('userId'));

        axios.post(url, fData)
            .then((response) => {
                const APIResponse = response.data; // This is response data from AXIOS
            
               console.log(AllNodesData);
                setAllNodesData(APIResponse.data);
               
            })
            .catch(error => alert(error, " Try Again...!"));
    }



    useEffect(() => {
        /* eslint-disable react-hooks/exhaustive-deps */
        getAllNodesData();
/* eslint-enable react-hooks/exhaustive-deps */
       
    },[]);
    return (
        <div className="bg-white border-2  border-green-600 p-2 h-fit max-h-[300px] overflow-y-scroll min-h-[300px] shadow-md rounded-lg">
            <p className="text-center text-3xl font-bold text-green-600 text-stroke">Farm Name <b className='text-orange-600'>{props.farmName}</b>  </p>
        </div>

    )
}

export default DashFarmInfo
