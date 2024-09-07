import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingTransisi from '../components/LoadingTransisi';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingTransisi />;
  }

  if (user) {
    return children;
  }

  return <Navigate to='/Register' state={{ from: location }} replace />;
};

export default PrivateRouter;
