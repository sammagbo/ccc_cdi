import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppStore, UserRole } from '../../store/useAppStore'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const user = useAppStore(state => state.user)
  const location = useLocation()

  // Se não houver nenhum utilizador, redirecionar para a página de Login.
  // Grava a localização de onde tentaram aceder para reencaminhar depois do login.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Se a rota exige papéis específicos, verificar se o utilizador possui esse papel
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redireciona para um hub inicial se for não autorizado
    // ex: se o aluno tentar ir para o /admin, vai voltar para o root
    return <Navigate to="/" replace />
  }

  // Autorizado! Renderiza a rota filha
  return <Outlet />
}
