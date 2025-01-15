import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io(process.env.REACT_APP_BACKEND_URL, { transports: ['websocket'] });

const BidForm = () => {
    const { id } = useParams()
    const [bid, setBid] = useState(0)
    const [bidder, setBider] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        const bidData = { id, bid, bidder };
        socket.emit('placeBid', bidData);
        navigate('/')
        setBid(0)
        setBider('')
    };
    return (
        <div className='flex justify-center content-center'>
            <div className='p-7 w-1/2 flex flex-col justify-between h-screen'>
                {/* <img className='w-16 ml-1 mb-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3>Enter item initial bid</h3>
                    <input
                        required
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='in pkr' type="Number" />
                    <h3>Enter your name</h3>

                    <input
                        required
                        value={bidder}
                        onChange={(e) => setBider(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='abc user' type="text" />

                    <button
                        className='mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg'
                    >Add bid</button>
                    <p>Go to home page<Link to='/' className='text-blue-600'>Home</Link></p>
                </form>
                {/* <div>
  <Link to='/captain-register'
      className='bg-[#10b461] flex items-center justify-center rounded mt-5 px-10 py-2 border w-full text-lg placeholder:text-base'
  >Register as a Captain</Link>
</div> */}
            </div>
        </div>
    )
}

export default BidForm
