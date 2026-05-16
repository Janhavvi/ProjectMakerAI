// src/routes/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import WorkspaceTopbar from '../components/common/WorkspaceTopbar';

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <WorkspaceTopbar />
      {children}
    </>
  );
}

export default ProtectedRoute;
