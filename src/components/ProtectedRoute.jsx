import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function ProtectedRoute({ children, requiredRole }) {
  const user = useAuthStore((s) => s.user)

  if (!user) return <Navigate to="/login" replace />

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'productor' ? '/productor' : '/comprador'} replace />
  }

  return children
}
