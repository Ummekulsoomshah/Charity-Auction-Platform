import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const ItemAdditionForm = () => {
    const [name,setItem]=useState('')
    const [description,setDescription]=useState('')
    const [bid,setBid]=useState(0)
    const [bidder,setBider]=useState('')

const submitHandler=async(e)=>{
    e.preventDefault()
    const itemData={
        name:name,
        description,
        bid,
        bidder
    }
    try{
        const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/createItem`,itemData,{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status===201){
            console.log('Item added successfully')
        }else{
            console.log('Item not added')
        }
    }catch(ERR){
        console.log(ERR)
    }
    setItem('')
    setDescription('')
    setBid(0)
    setBider('')
}
    return (
        <div className='flex justify-center content-center'>
            <div className='p-7 w-1/2 flex flex-col justify-between h-screen'>
                {/* <img className='w-16 ml-1 mb-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-xl mb-2'>Enter Name of Item</h3>
                    <input
                        required
                        value={name}
                        onChange={(e) => setItem(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded mt-2 mb-5 px-10 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='xyz'
                        type="text" />
                    <h3>Enter item description</h3>
                    <input
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='it is about xyz' type="text" />
                    <h3>Enter item initial bid</h3>
                    <input
                        required
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='in pkr' type="Number" />
                    <h3>Enter item bidder name</h3>

                    <input
                        required
                        value={bidder}
                        onChange={(e) => setBider(e.target.value)}
                        className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
                        placeholder='abc user' type="text" />

                    <button
                        className='mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg'
                    >Add item</button>
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

export default ItemAdditionForm
