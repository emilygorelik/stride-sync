import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserTokenProvider } from './api';
import './index.css';
import Login from './screens/login';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserTokenProvider>
        <Login />
      </UserTokenProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
