import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './screens/login';
import Callback from './screens/callback';
import { UserTokenProvider } from './scripts/api';
import { QueryClient, QueryClientProvider } from 'react-query';

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
