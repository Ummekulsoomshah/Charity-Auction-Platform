import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import ItemAdditionForm from './pages/ItemAdditionForm';
import BidForm from './pages/BidForm';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/ItemAdditionForm' element={<ItemAdditionForm/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/bidForm/:id' element={
          <ProtectedRoute>

            <BidForm/>
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
