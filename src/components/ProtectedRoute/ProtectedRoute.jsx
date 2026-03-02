import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p>Cargando...</p>

  if (!user) {
    return <Navigate to="/sign_up" replace />
  }

  return children
}

export default ProtectedRoute
