import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {  useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import { FaEye } from 'react-icons/fa';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import PieChart from '../../components/Charts/PieChart';
const Insights = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const [chartData, setChartData] = useState({});

	const getUsers = async () => {
		const result = await fetchGet(role + `/genre`);

		if (result.success) {
			setData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
				}))
			);
		} else {
			navigate('/');
		}
	};
	
	const createCharts=()=>{
        // topFive();
    }
	useEffect(() => {
		getUsers();
        createCharts();
	}, []);
	const labels = ["January", "February", "March", "April", "May", "June", "July","August","September","Octobor","November","December"];
const datasets = [
  {
    label: "Monthly Book Borrowed",
    data: [65, 59, 80, 81, 56, 55, 40,89,56,37,56,12],
    fill: false,
    borderColor: getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
    tension: 0.4,
  },

];
const labels1 = ["January", "February", "March", "April", "May", "June", "July","August","September","Octobor","November","December"];
const datasets1 = [
  {
    label: "Monthly book overdue",
    data: [20, 59, 50, 31, 46, 65, 80,90,10,30,70,56],
    fill: false,
    borderColor: getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
    tension: 0.4,
  },
 
];

   const labels4= ["Romantic", "Action", "Comedy"];
   const datasets4 = [
    {
        data: [5, 3, 7],
        backgroundColor: [
            getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
            getComputedStyle(document.documentElement).getPropertyValue("--yellow-500"),
            getComputedStyle(document.documentElement).getPropertyValue("--green-500"),
        ],
        hoverBackgroundColor: [
            getComputedStyle(document.documentElement).getPropertyValue("--blue-400"),
            getComputedStyle(document.documentElement).getPropertyValue("--yellow-400"),
            getComputedStyle(document.documentElement).getPropertyValue("--green-400"),
        ],
    },
];
const labels5= ["Overdue", "Not Overdued"];
const datasets5 = [
 {
     data: [80,20],
     backgroundColor: [
         getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
         getComputedStyle(document.documentElement).getPropertyValue("--yellow-500"),
         getComputedStyle(document.documentElement).getPropertyValue("--green-500"),
     ],
     hoverBackgroundColor: [
         getComputedStyle(document.documentElement).getPropertyValue("--blue-400"),
         getComputedStyle(document.documentElement).getPropertyValue("--yellow-400"),
         getComputedStyle(document.documentElement).getPropertyValue("--green-400"),
     ],
 },
];
const labels7= ["Overdue", "Not Overdued"];
const datasets7= [
 
    {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
        tension: 0.4,
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue("--pink-500"),
        tension: 0.4,
      },
 
];
const type='horizontal';

   
    
  
	
	return (
		<>
			<div className="px-5 w-full">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Insights</div>
				</div>
				<div className="py-5">
					<div className="rounded-xl shadow-md h-[60vh] p-5 bg-white w-full">
                    <div className="text-2xl font-bold">Monthly Statistics</div>
						<LineChart labels={labels} datasets={datasets}/>
					</div>
				</div>
                <div className="py-5">
					<div className="rounded-xl shadow-md h-[60vh] p-5 bg-white w-full">
                    <div className="text-2xl font-bold">Monthly Overdue Statistics</div>
						<LineChart labels={labels1} datasets={datasets1}/>
					</div>
				</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  py-5">
						<div className="rounded-xl shadow-md h-[55vh] p-5 bg-white ">
                    <div className="text-2xl font-bold">Top Genres</div>
                    <div className='flex justify-center items-center'>
							<PieChart labels={labels4} datasets={datasets4}/>
						</div>
                        </div>
                        <div className="rounded-xl shadow-md h-[55vh] p-5 bg-white">
                    <div className="text-2xl font-bold">Book Overdue Statistics</div>
                    <div className='flex justify-center items-center'>
							<PieChart labels={labels5} datasets={datasets5}/>
                            </div>
						</div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  py-5">
						<div className="rounded-xl shadow-md h-[55vh] p-5 bg-white ">
                    <div className="text-2xl font-bold">Best Seller</div>
                    <BarChart labels={labels7} datasets={datasets7} type={type}/>
                        </div>
                        <div className="rounded-xl shadow-md h-[55vh] p-5 bg-white ">
                        <div className="text-2xl font-bold">Payment Insights</div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  py-5">
                        <div className="rounded-xl shadow-md h-[25vh] p-5 bg-white ">
                    <div className="text-2xl font-bold">Payment done</div>
                
                            <h1 className='text-2xl font-bold text-center'>144</h1>
                            </div>
                        
                        </div>
                        </div>
                        </div>
			</div>
		</>
	);
};

export default Insights;
