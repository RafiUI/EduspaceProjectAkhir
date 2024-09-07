import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider'; 

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
