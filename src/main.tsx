import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserTokenProvider } from './api';
import './index.css';
import Callback from './screens/callback';
import Home from './screens/home';
import Login from './screens/login';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/callback',
    element: <Callback />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserTokenProvider>
        <RouterProvider router={router} />
      </UserTokenProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
