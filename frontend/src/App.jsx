import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/login';
import AuctionsList from './pages/AuctionsList';
import Dashboard from './pages/Dashboard';
import ItemAdditionForm from './pages/ItemAdditionForm';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/AuctionsList' element={<AuctionsList/>}/>
        <Route path='/ItemAdditionForm' element={<ItemAdditionForm/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
