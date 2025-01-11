import React, { useEffect, useState } from 'react'
import img1 from '../assets/puppy-4234435_1280.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const Home = () => {
    const [auctions, setAuctions] = useState([])
    const navigate = useNavigate()
    const bidform = (auctId) => {
        navigate(`/bidForm/${auctId}`)
    }
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/itemList',
                    {
                        headers: {
                            "authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                const items = res.data.items
                setAuctions(items)
                socket.emit('currentBid', auctions)

                console.log(auctions)

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
    })

    
    return (
        <>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mt-4 w-full">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>

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
                            <p>Bid : {auction.bid}</p>
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