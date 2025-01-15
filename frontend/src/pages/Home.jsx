import React, { useEffect, useState } from 'react'
import img1 from '../assets/puppy-4234435_1280.jpg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const Home = () => {
    const [auctions, setAuctions] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`/?page=${page}&limit=${limit}`)
    }

    const bidform = (auctId) => {
        navigate(`/bidForm/${auctId}`)
    }
    const logout = () => {
        localStorage.removeItem('token')
        console.log("logout")
    }
    useEffect(() => {
        const fetchAuctions = async () => {
            const queryParams = new URLSearchParams(location.search);
            const page = queryParams.get('page') || 1;
            const limit = queryParams.get('limit') || 10;
            console.log(limit)

            try {
                const res = await axios.get('http://localhost:3000/user/itemList',
                    {
                        headers: {
                            "authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                        params: {
                            page,
                            limit
                        }
                    }
                )
                const items = res.data.items
                setAuctions(items)
                socket.emit('currentBid', auctions)

                // console.log(auctions)

            } catch (error) {
                console.log(error)
            }
        }
        fetchAuctions()
        socket.on('updateBid', (updatedAuction) => {
            setAuctions((prevAuctions) =>
                prevAuctions.map(auction =>
                    auction._id === updatedAuction._id ? updatedAuction : auction
                )
            );
        });

        return () => {
            socket.off('updateBid');
        };
    }, [location.search])


    return (
        <>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mt-4 w-full">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                            <li>
                                <button
                                    className="mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg"

                                    onClick={() => logout()} >LOGOUT</button>


                            </li>
                            <form onSubmit={(e) => { submitHandler(e) }}>
                                <div class="mb-4 flex">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
                                       Page NO
                                    </label>
                                    <input
                                    value={page}
                                    onChange={(e) => setPage(e.target.value)}
                                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="Number" placeholder="xx" />
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
                                       No of bid items
                                    </label>
                                    <input
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="Number" placeholder="xx" />
                               
                                <button
                        type="submit"
                        className="ml-4 p-2 bg-black text-white rounded"
                    >
                        Apply
                    </button>
                                </div>
                            </form>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className='relative flex justify-center items-center'>
                <img className='w-full h-auto object-cover' src={img1} alt="Puppy" />
                <div className='absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-6 rounded shadow-lg'>
                    <h2 className='text-2xl font-bold mb-2'>Welcome to Our Charity Platform</h2>
                    <p className='text-gray-700 mb-6'>Our mission is to help puppies in need through live charity auctions. Join us in making a difference.</p>
                    <Link to='/Register' class="mt-6 rounded border border-black px-4 py-2 mt-6 text-white bg-black">Get Started</Link>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto mt-10 px-4 pl-20">
                <h2 className='text-2xl font-bold mb-5'>Current ongoing auctions</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 ">
                    {/* Auction Cards */}
                    {auctions.map((auction) => (

                        <div key={auction._id} className="bg-white w-3/4 border border-black rounded-lg shadow p-10">
                            <h4 className="text-lg font-bold mb-2">{auction.name}</h4>
                            <p className="text-gray-600 mb-4">{auction.description}</p>
                            <p>Highest Bid : {auction.bid}</p>
                            <p>Bidder : {auction.bidder}</p>
                            <button
                                className="mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg"

                                onClick={() => bidform(auction._id)}>Bid for it </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home