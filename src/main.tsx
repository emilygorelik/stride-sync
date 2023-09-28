import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './screens/login';
import Home from './screens/home';
import { UserTokenProvider } from './scripts/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserTokenProvider>
      <RouterProvider router={router} />
    </UserTokenProvider>
  </React.StrictMode>,
);
