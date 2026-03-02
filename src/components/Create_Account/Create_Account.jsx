import { useNavigate } from "react-router-dom"
import { supabase } from "../../../supabase"
import React, { useState } from "react"
import './Create_Account.css'

function Create_Account() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
    avatar_url: "",
    bio: "",
    birth_date: "",
    phone_number: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        username: formData.username,
        full_name: formData.full_name,
        avatar_url: formData.avatar_url,
        bio: formData.bio,
        birth_date: formData.birth_date,
        phone_number: formData.phone_number,
      })

    if (profileError) {
      setMessage(profileError.message)
      setLoading(false)
      return
    }

    navigate("/home")
    setLoading(false)
  }

  return (
    <div className="createAccount">
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="avatar_url"
          placeholder="Avatar URL"
          value={formData.avatar_url}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Biography"
          value={formData.bio}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />

        <input
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default Create_Account
