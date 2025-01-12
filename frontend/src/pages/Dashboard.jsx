import React from 'react'
import { Link } from 'react-router-dom'
import { Line } from "react-chartjs-2";

import DashboardItems from './DashboardItems'
import BarChart from './BarChart';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const Dashboard = () => {
  const submitHandler = async (e) => {
    e.preventDefault()
    let amount = document.getElementById('amount').value

localStorage.setItem('amount', amount)
    socket.emit('updateRequiredAmount', amount);
    console.log(amount)

    amount=0
  }
  return (

    <>
      <div class="p-6 w-full mx-auto bg-white rounded-xl shadow-lg  flex  items-center justify-between">
        <div class="text-4xl font-bold text-black">
          <Link to='/ItemAdditionForm' class="text-xl font-medium text-black">Create Item for Auction</Link>
        </div>
        <form  onSubmit={(e) => { submitHandler(e) }}>
          <div class="mb-4 flex">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
              Charity required for today
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="Number" placeholder="xxxxx" />
          </div>
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Add amount
          </button> */}
        </form>
        <div class="text-4xl font-bold text-black">
          {/* <Link to='/jobslisting' class="text-xl font-medium text-black">See Applicants</Link> */}
        </div>
      </div>
      <div className="w-full basis-3/5 flex flex-col">
        <h2 className="text-3xl font-bold text-center text-gray-500 my-5">
          Auction Admin Dashboard
        </h2>
        <p className="text-lg text-center"> currentDate</p>
        <br />
        {/* <p className="text-xl font-bold text-center"> city</p> */}

      </div>
      <div className="w-full flex flex-col p-7 gap-5 bg-[#0a5282] rounded-lg mt-5">
        <div className="flex flex-col items-center justify-between">
          {/* Button group */}
          <div className="flex flex-row gap-3 mb-10 bg-transparent">
            {/* <TimeFrameSelector setTimeFrame={setTimeFrame} /> */}
          </div>
          {/* Charts */}
          <div className="flex flex-row gap-7 w-full mb-7">
            <div className="w-full h-full rounded-xl p-5 bg-white flex justify-center items-center">
              <DashboardItems />
            </div>
            <div className="w-full h-full rounded-xl p-5 bg-white flex justify-center items-center">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
