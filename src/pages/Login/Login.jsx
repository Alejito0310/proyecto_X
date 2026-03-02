import { data, useNavigate } from 'react-router-dom';
import {supabase} from '../../../supabase.js'
import React, { useState } from 'react'

function Login() {
const navigate = useNavigate()

    const [authData, setAuthData] = useState({
      email: '',
      password: '',
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleAuthChange = (e) => {
        setAuthData({
          ...authData,
          [e.target.name]: e.target.value
        })
      }

    const handleAuthSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setMessage("")

        const {data, error} = await supabase.auth.signInWithPassword({
            email: authData.email,
            password: authData.password,
        })

        if(error){
        setMessage("Error al iniciar sesión")
        console.log(error.message)
        }else{
        setMessage("Inicio de sesión exitoso")
        navigate('/home', { replace: true })
        }
        setLoading(false)
    }
 
  return (
    <>
      <form onSubmit={handleAuthSubmit}>
        <input
            type="text"
            name="email"
            placeholder="email"
            value={authData.email}
            onChange={handleAuthChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="password"
            value={authData.password}
            onChange={handleAuthChange}
            required
        />

        <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
        </button>

        {message && <p>{message}</p>}
        </form>
    </>
  )
}

export default Login
