import React from 'react'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
      <div class="p-6 w-50 mx-auto bg-white rounded-xl shadow-lg  flex  items-center gap-4">
        <div class="text-4xl font-bold text-black">
          <Link to='/ItemAdditionForm' class="text-xl font-medium text-black">Create Item for Auction</Link>
        </div>
        <div class="text-4xl font-bold text-black">
          <Link to='/jobslisting' class="text-xl font-medium text-black">See Applicants</Link>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-black pt-10 text-center">Dear Admin ,Welcome</h1>
      <h4 className='text-center'>Bid and bid</h4>
    </>
  )
}

export default Dashboard
