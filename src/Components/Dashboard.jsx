import React, { useEffect, useState } from 'react'
import DashFarmInfo from './DashFarmInfo'
import axios from 'axios';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const [spinner, setSpinner] = useState(0);
    const [FarmData, setFarmData] = useState([]);
    const getFarmData = () => {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/smart-agri/software/user/getFarmData.php`;
        let fData = new FormData();

        fData.append('FarmId', '');   // send empty then it returns all farms data else it gives only data of give farm id
        fData.append('userId', Cookies.get('userId'));

        axios.post(url, fData)
            .then((response) => {
                const APIResponse = response.data; // This is response data from AXIOS
                setSpinner(0);
                setFarmData(APIResponse.data);
            })
            .catch(error => alert(error, " Try Again...!"), setSpinner(0));
    }

    useEffect(() => {
        getFarmData();
    }, [])
    return (
        <div className='w-full h-full bg-green-50 p-4 '>
            {/* Loading Spinner */}
            <div role="status" className={`${spinner ? "block" : "hidden"} absolute inset-0 flex lg:ml-[15%] items-center justify-center`}>
                <svg aria-hidden="true" className="w-[100px] h-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>


            {FarmData && FarmData.length ? (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 pb-5">
                  { FarmData.map((farm, index) => (
                    <DashFarmInfo key={index} props={farm} />
                    ))}
                </div>
                    )
               
                    :
                    <div className='w-fit h-fit mt-[250px] text-3xl  p-5 md:p-8 lg:p-10  rounded-xl text-black font-semibold mx-auto my-auto bg-green-500 '>No Farm Data Available</div>
            }

                </div>
            )
}

            export default Dashboard


