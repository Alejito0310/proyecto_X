import React from 'react'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Sign_up from './pages/Sign_up/Sign_up'
import Create_Account from './components/Create_Account/Create_Account'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/editProfile'
import Home from './pages/Home/Home'
function App() {
  return (
    <>
      
    <Routes>
      <Route path='/' element={<PublicRoute><Sign_up/></PublicRoute>} />
      <Route path='/sign_up' element={<PublicRoute><Sign_up/></PublicRoute>} />
      <Route path='/create_account' element={<Create_Account/>} />
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />

      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} ></Route>
      <Route path='/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>} ></Route>
      <Route path='/profile/:id/edit' element={<ProtectedRoute><EditProfile/></ProtectedRoute>} ></Route>

    </Routes>
    
    </>
  )
}


export default App
