import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const { user, setuser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    try {

      const response = await axios.post('http://localhost:3000/user/login', userData)
      if (response.status === 200) {
        console.log('user found')
        console.log(response.data)
        const token = response.data.token
        console.log(token)
        localStorage.setItem('token', token)
        if(response.data.user.role==='admin'){
          console.log('admin')
          navigate('/Dashboard')
        }else if(response.data.user.role==='bider'){
          console.log('bider')
          navigate('/AuctionsList')
        }
      }
    } catch (err) {
      console.log(err)
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='flex justify-center content-center'>
      <div className='p-7 w-1/2 flex flex-col justify-between h-screen'>
        {/* <img className='w-16 ml-1 mb-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}

        <form onSubmit={(e) => { submitHandler(e) }}>
          <h3 className='text-xl mb-2'>Enter your email address</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white bg-[#eeeeee] rounded mt-2 mb-5 px-10 py-2 border border-black w-full text-lg placeholder:text-base'
            placeholder='user@gmail.com'
            type="email" />
          <h3>Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-white bg-[#eeeeee] rounded px-10 mt-2 mb-5 py-2 border border-black w-full text-lg placeholder:text-base'
            placeholder='user123@' type="text" />

          <button
            className='mt-3 text-white bg-black flex items-center justify-center rounded px-10 py-2 border border-black w-full text-lg'
          >LOGIN</button>
          {/* <p>Already have an Account?<Link to='/login' className='text-blue-600'>Sign in here</Link></p> */}
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

export default Login
