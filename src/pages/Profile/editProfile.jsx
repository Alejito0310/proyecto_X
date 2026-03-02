import React, { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import './Profiles.css'

function EditProfile() {
  const { user, loading } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
    bio: "",
    birth_date: "",
    phone_number: "",
  })

  if (loading) return <p>Cargando...</p>

  if (!user || user.id !== id) {
    return <Navigate to="/home" replace />
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.log(error)
        return
      }

      if (data) {
        setFormData({
          username: data.username || "",
          full_name: data.full_name || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
          birth_date: data.birth_date || "",
          phone_number: data.phone_number || "",
        })
      }
    }

    fetchProfile()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", id)

    if (error) {
      console.log(error)
    } else {
      navigate(`/profile/${id}`)
    }

    setSaving(false)
  }

  return (
    <div className="editProfile">
      <h2>Editar perfil</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Nombre completo"
        />

        <input
          name="avatar_url"
          value={formData.avatar_url}
          onChange={handleChange}
          placeholder="Avatar URL"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        />

        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />

        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Teléfono"
        />

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  )
}

export default EditProfile
