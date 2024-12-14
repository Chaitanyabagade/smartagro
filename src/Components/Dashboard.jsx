import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateFarm from './CreateFarm';
import ViewFarm from './ViewFarm';

const Dashboard = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

        useEffect(() => {
            // Function to update dimensions
            const handleResize = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Cleanup listener on component unmount
            return () => window.removeEventListener("resize", handleResize);
        }, []);


  

    return (
        <div className={` md:w-[${dimensions.width - 260}'px'] h-[91vh]  ml-[0px]  lg:ml-[260px]   bg-blue-50 text-black mt-[67px]`}>
            <Routes>
                 <Route path='/CreateFarm' element={<CreateFarm/>} /> 
                 <Route path='/ViewFarm' element={<ViewFarm/>} /> 
            </Routes>


        </div>

    )
}

export default Dashboard
