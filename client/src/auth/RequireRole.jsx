import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

const RequireRole = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireRole;